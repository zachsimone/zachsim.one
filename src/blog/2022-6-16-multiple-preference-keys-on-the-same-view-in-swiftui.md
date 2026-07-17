---
title: "Multiple Preference Keys on the Same View in SwiftUI"
date: 2022-06-16T21:47:34.816+10:00
permalink: "/blog/2022/6/16/multiple-preference-keys-on-the-same-view-in-swiftui.html"
layout: layouts/post.njk
image: "/images/1655380055271/image.png"
---
## The problem

Cast your mind back to the early days of SwiftUI. It wasn't possible to have multiple `.sheet` modifiers attached to the same View. Or, for that matter, to the same "tree" of the view hierarchy. Apple has since fixed this, at least for Sheet, so code like this is now perfectly valid:

```
Text("Hello, world")
    .sheet(isPresented: $presentSheetOne) {
        Text("Sheet one")
    }
    .sheet(isPresented: $presentSheetTwo) {
        Text("Sheet two")
    }
```

But, what if you try this with an Alert?

```
Text("Hello, world")
    .alert(isPresented: $showAlertOne) {
        Alert(title: Text("Alert one"))
    }
    .alert(isPresented: $showAlertTwo) {
        Alert(title: Text("Alert two"))
    }
```

At the time of writing (June 2022) the above code will not work. The second alert will present fine, if you want it to. But setting `showAlertOne` to `true` will not result in the first alert being presented.

## What is going on?

It is safe to assume that behind the scenes, Apple is using [preference keys](https://developer.apple.com/documentation/swiftui/preferencekey) to drive these APIs, and there are limitations associated with preference keys. It's well documented [elsewhere](https://sarunw.com/posts/how-to-show-multiple-alerts-on-the-same-view-in-swiftui/), but problems arise when either multiple views in the same view try to set the same preference key, or when multiple views in the same branch of the view hierarchy tree try to set a preference key - e.g. both a parent and child trying to set the same preference key. The problems remain when trying to respond to a custom preference key.

## The example

Imagine an app that wants its deeply-nested child views to bubble information up to the parent using preference keys. This post assumes a basic understanding of preference keys in SwiftUI. We'll use a simple example, with strings from a couple of text fields being set up the view hierarchy. Each text field has an associated priority value, and messages with a higher priority should be shown before those with a lower priority. Take the following code.

```
struct Message: Equatable {
    enum Priority: Int, Equatable, Comparable {
        case low, medium, high

        static func < (lhs: Message.Priority, rhs: Message.Priority) -> Bool {
            lhs.rawValue < rhs.rawValue
        }
    }

    let priority: Priority
    let content: String
}

struct MessagePreferenceKey: PreferenceKey {
    static var defaultValue: Message?

    static func reduce(value: inout Message?, nextValue: () -> Message?) {
        guard let existingValue = value, !existingValue.content.isEmpty else {
            value = nextValue()
            return
        }
        guard let next = nextValue(), !next.content.isEmpty, next.priority > existingValue.priority else {
            return
        }
        value = next
    }
}

extension View {
    func message(_ message: String, priority: Message.Priority, isShown: Bool) -> some View {
        preference(key: MessagePreferenceKey.self, value: isShown ? Message(priority: priority, content: message) : nil)
    }
}


struct ContentView: View {

    @State private var message: Message? = MessagePreferenceKey.defaultValue

    @State private var textOne: String = ""
    @State private var textTwo: String = ""

    @State private var showMessages: Bool = false

    var body: some View {
        VStack {

            if let message = message?.content {
                VStack {
                    Text("Message!!!")
                        .font(.title3)
                    Text(message)
                        .fontWeight(.semibold)
                }
                .padding()
                .background(Color.gray)
            }

            VStack {
                TextField("Message one", text: $textOne)
                    .message(textOne, priority: .high, isShown: showMessages)
                TextField("Message two", text: $textTwo)
                    .message(textTwo, priority: .medium, isShown: showMessages)
                Toggle("Show messages?", isOn: $showMessages)
            }
        }
        .onPreferenceChange(MessagePreferenceKey.self) { newMessage in
            self.message = newMessage
        }
    }
}
```

Multiple views are using preference keys to send a message up the chain. If both text fields try to present their data, only the text entered in the first text field will be shown, due to its higher priority. If the first text field is empty, anything in the second text field will be shown. If both are empty, nothing is shown.

But what if we want to apply two of the `.message` modifiers to the same view? Let's say we want all the modifiers on the parent view:

```
VStack {
    TextField("Message one", text: $textOne)
    TextField("Message two", text: $textTwo)
    Toggle("Show messages?", isOn: $showMessages)
}
.message(textOne, priority: .high, isShown: showMessages)
.message(textTwo, priority: .medium, isShown: showMessages)
```

This is a similar situation to having two alerts attached to the same view from earlier. Despite our best efforts, doing this will never show the text from the first text field - despite it having the highest priority. The second `.message` modifier always takes priority.

This issue can also be seen when the modifier is applied to two views in the same "tree":

```
VStack {
    VStack {
        TextField("Message one", text: $textOne)
            .message(textOne, priority: .high, isShown: showMessages)
        TextField("Message two", text: $textTwo)
    }
    .message(textTwo, priority: .medium, isShown: showMessages)
    Toggle("Show messages?", isOn: $showMessages)
}
```

In an example project this isn't a big deal, as we can move views and their modifiers around to ensure no conflicts. In a larger project where views upon views are nested, and it's impossible to have a complete picture of the view hierarchy, we run into this problem all the time. It can be daunting to set a new preference key higher up the chain for fear of unknowingly affecting one in a subview below.

## The solution

So, what can be done? The secret lies in where the preference key is set on the view hierarchy.

```
extension View {
    func message(_ message: String, priority: Message.Priority, isShown: Bool) -> some View {
        preference(key: MessagePreferenceKey.self, value: isShown ? Message(priority: priority, content: message) : nil)
    }
}
```

Applying the preference key to a hidden rectangle behind our view changes the hierarchy enough that we are able to put multiple preference keys on the same view, or along the same branch of the view tree.

```
background(Rectangle().hidden().preference(key: MessagePreferenceKey.self, value: isShown ? Message(priority: priority, content: message) : nil))
```

With this change, the following code is now completely valid:

```
VStack {
    VStack {
        TextField("Message one", text: $textOne)
        TextField("Message two", text: $textTwo)
    }
    .message(textOne, priority: .high, isShown: showMessages)
    .message(textTwo, priority: .medium, isShown: showMessages)
    Toggle("Show messages?", isOn: $showMessages)
}
```

The first message, if present, is shown with priority. Otherwise, the second will be shown.

It works as expected. We've done it!

## Tying it all together

How does this relate to our initial example with `Alert`? We can apply what we've learnt about preference keys to the Alert modifier, and explore how to apply multiple `.alert` modifiers to the same view.

Extending View, and giving our modifier the same background + rectangle treatment gets us here:

```
extension View {
    func multipleAlert(isPresented: Binding<Bool>, content: () -> Alert) -> some View {
        background(Rectangle().hidden().alert(isPresented: isPresented, content: content))
    }
}
```

Which allows multiple alerts to be attached to the same view, like so:

```
Text("Hello, world")
    .multipleAlert(isPresented: $showAlertOne) {
        Alert(title: Text("Alert one"))
    }
    .multipleAlert(isPresented: $showAlertTwo) {
        Alert(title: Text("Alert two"))
    }
```

Of course, there are many modifiers that can be used to apply alerts to a view, and we'd have to override all of the ones relevant to our project. But this is a good start.

## In conclusion

Preference keys are powerful, and knowing how to use them is important for any SwiftUI developer. Apple has deemed this issue with having multiple preference keys attached to the same view big enough issue to fix it for Sheets in SwiftUI, but for some reason the original behaviour remains for Alerts and other types of preference-key backed views. There may be a good reason why. It may be a misuse of the API to allow multiple preference key values to complete all from the same branch of the view hierarchy. I don't know. But I do know sometimes you have a need to set preference key values from multiple, nearby places in your view hierarchy, and the discussed solution allows that to be achieved. You'll find this solution most useful when working with your own preference keys in SwiftUI.

I hope this won't be necessary in a future release of SwiftUI, or at least it will be explained why this solution is a bad idea, and how to properly achieve what we're trying to achieve here with preference keys. But until then, this is the best approach I've found.

As always if you have any feedback, or just want to say hi, I can be contacted [on Twitter](https://twitter.com/zachsimone).

---

For reference, here is the full code to the sample project in its final state.

```
struct Message: Equatable {
    enum Priority: Int, Equatable, Comparable {
        case low, medium, high

        static func < (lhs: Message.Priority, rhs: Message.Priority) -> Bool {
            lhs.rawValue < rhs.rawValue
        }
    }

    let priority: Priority
    let content: String
}

struct MessagePreferenceKey: PreferenceKey {
    static var defaultValue: Message?

    static func reduce(value: inout Message?, nextValue: () -> Message?) {
        guard let existingValue = value, !existingValue.content.isEmpty else {
            value = nextValue()
            return
        }
        guard let next = nextValue(), !next.content.isEmpty, next.priority > existingValue.priority else {
            return
        }
        value = next
    }
}

extension View {
    func message(_ message: String, priority: Message.Priority, isShown: Bool) -> some View {
        background(Rectangle().hidden().preference(key: MessagePreferenceKey.self, value: isShown ? Message(priority: priority, content: message) : nil))
    }
}


struct ContentView: View {

    @State private var message: Message? = MessagePreferenceKey.defaultValue

    @State private var textOne: String = ""
    @State private var textTwo: String = ""

    @State private var showMessages: Bool = false

    var body: some View {
        VStack {

            if let message = message?.content {
                VStack {
                    Text("Message!!!")
                        .font(.title3)
                    Text(message)
                        .fontWeight(.semibold)
                }
                .padding()
                .background(Color.gray)
            }


            VStack {
                VStack {
                    TextField("Message one", text: $textOne)
                    TextField("Message two", text: $textTwo)
                }
                .message(textOne, priority: .high, isShown: showMessages)
                .message(textTwo, priority: .medium, isShown: showMessages)
                Toggle("Show messages?", isOn: $showMessages)
            }
        }
        .onPreferenceChange(MessagePreferenceKey.self) { newMessage in
            self.message = newMessage
        }
    }
}
```
