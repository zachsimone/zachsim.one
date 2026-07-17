---
title: "Responding to selection of a MapKit pin in SwiftUI"
date: 2024-08-23T17:30:00.057+10:00
permalink: "/blog/2024/8/23/responding-to-selection-of-a-mapkit-pin-in-swiftui.html"
layout: layouts/post.njk
image: "/images/1724398013112-C4M7RPIGL0802MV5H0X0/header.png"
---
We're about 5 years past the [introduction of SwiftUI](https://developer.apple.com/news/?id=06032019b) and it's impressive how far the framework has come in this time. However a part of SwiftUI that has been noticeably inferior than its UIKit counterpart is anything to do with MapKit UI.

[MapKit](https://developer.apple.com/documentation/mapkit/mapkit_for_appkit_and_uikit), particularly when used with UIKit components, is a very detailed and well thought-out piece of kit, but that's only really true when used in a UIKit context. It powers a lot of what you see in my app [Petty](https://petty-app.com). As such, I have tried to keep a close eye on its development alongside SwiftUI. An essential part of almost any map-heavy application is the ability to be shown more information upon selection of a pin or point on the map. This could be by pushing to a detail view, being presented with a sheet/overlay, or something else entirely.

It escaped my attention at the time, but as of the iOS 17 updates introduced at WWDC 2023, it is possible to do this with SwiftUI's new `Map.init<SelectedValue: Hashable>(selection: Binding<SelectedValue?>)` initialiser. The code is dead simple, too. For this example, let's show a few pins on a map, and when one is selected, present a sheet displaying the name of the location.

We start with a model to represent the data:

```swift
struct StationDetails: Identifiable, Hashable {
    
    struct Position: Hashable {
        let lat: Double
        let lon: Double
        
        var coordinate: CLLocationCoordinate2D {
            CLLocationCoordinate2D(latitude: lat, longitude: lon)
        }
    }
    
    let id: String
    
    let name: String
    let position: Position
}
```

And now let's plug it into a Map:

```swift
struct ContentView: View {
    
    @State private var selection: StationDetails? = nil
    
    let stations: [StationDetails]
    
    var body: some View {
        Map(selection: $selection) {
            ForEach(stations) { station in
                Marker(station.name, coordinate: station.position.coordinate)
                    .tag(station)
            }
        }
        .sheet(item: $selection) { station in
            NavigationStack {
                Text(station.name)
            }
            .presentationDetents([.medium])
        }
    }
}
```

And that's it. Really! This code is fully-functioning. I haven't seen any good posts about this `Map(selection:)` initialiser – so here one is. I hope it's helpful. Now of course we could make this nicer by doing things like moving the map position so that the pin appears centred when the sheet appears – but that functionality is beyond the scope of this post.

Since binding to selections is now possible, we're close to the point where I would no longer default to laying out a map with UIKit. The last thing keeping me in MapKit-UIKit-by-default land is lack of support for pin clustering. One can hope for WWDC25, right?

Armed with this knowledge, go forth and react to map pin selection changes.

---

Here's the full code from the above example, putting everything together including imports and a SwiftUI preview:

```swift
import MapKit
import SwiftUI

struct StationDetails: Identifiable, Hashable {
    
    struct Position: Hashable {
        let lat: Double
        let lon: Double
        
        var coordinate: CLLocationCoordinate2D {
            CLLocationCoordinate2D(latitude: lat, longitude: lon)
        }
    }
    
    let id: String
    
    let name: String
    let position: Position
}

struct ContentView: View {
    
    @State private var selection: StationDetails? = nil
    
    let stations: [StationDetails]
    
    var body: some View {
        Map(selection: $selection) {
            ForEach(stations) { station in
                Marker(station.name, coordinate: station.position.coordinate)
                    .tag(station)
            }
        }
        .sheet(item: $selection) { station in
            NavigationStack {
                Text(station.name)
            }
            .presentationDetents([.medium])
        }
    }
}

#Preview {
    ContentView(stations: [
        StationDetails(id: UUID().uuidString, name: "Sydney", position: StationDetails.Position(lat: -33.8688, lon: 151.2093)),
        StationDetails(id: UUID().uuidString, name: "Melbourne", position: StationDetails.Position(lat: -37.8136, lon: 144.9631)),
        StationDetails(id: UUID().uuidString, name: "Perth", position: StationDetails.Position(lat: -31.9514, lon: 115.8617))
    ])
}
```
