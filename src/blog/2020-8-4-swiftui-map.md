---
title: "SwiftUI Map"
date: 2020-08-04T19:26:26.867+10:00
permalink: "/blog/2020/8/4/swiftui-map.html"
layout: layouts/post.njk
image: "/images/1596542840566/image.png"
---
*Note this post is current as at the time of writing - 4th August 2020 - and at such time Xcode 12 beta 3 (12A8169g) is the most recent available version of Xcode.*

At WWDC20, as part of a bunch of new SwiftUI UI elements, we got [`Map`](https://developer.apple.com/documentation/mapkit/map). It's a super limited Map API that should only be used for the simplest of Maps. UIKit's [`MKMapView`](https://developer.apple.com/documentation/mapkit/mkmapview) is still the real-deal for the time being. Hopefully this changes soon.

Anyway, all that `Map` is good for is showing a few simple markers or pins at key points on a map.

How do we do this?

Well, don't forgot to `import MapKit`! This one got me... yes, I can be slow at the best of times. If you're used to working in SwiftUI, typically `import SwiftUI` takes care of all the relevant UI elements. But not if you want to display a `Map`!

Now that you've managed the simple stuff, here's some more simple stuff.

If you just want to show a map, the bare minimum you can get away with is initialising a `Map` with a `coordinateRegion` (a good ol' `MKCoordinateRegion`). If you've worked with maps in UIKit you'll be familiar with this.

Some example code:

```
struct ContentView: View {
    private static let defaultCoordinate = CLLocationCoordinate2D(latitude: -33.8688, longitude: 151.2093)
    private static let defaultSpan = MKCoordinateSpan(latitudeDelta: 20, longitudeDelta: 20)
    @State private var coordinateRegion = MKCoordinateRegion(center: defaultCoordinate, span: defaultSpan)

    var body: some View {
        Map(coordinateRegion: $coordinateRegion)
    }
}
```

Now what about showing things on this map? Markers or pins, anyone? The `Map` API is very simple - it takes a `RandomAccessCollection` (a Swift Array is fine) with data, and allows you to turn it into a map pin. This could be your data model. I've constructed a very simple one below for convenience. The only requirement is that it conforms to `Identifiable`.

```
struct Location: Identifiable {
    let id = UUID()

    let name: String
    let coordinate: CLLocationCoordinate2D
}
```

We're going to pass an array of `Location` objects through to the Map initialiser, and use them to construct pins on the map. For example, let's mark out cities on the East Coast of Australia.

First, add some data:

```
private let locationsToDisplay: [Location] = [
    Location(name: "Sydney 😎", coordinate: CLLocationCoordinate2D(latitude: -33.8688, longitude: 151.2093)),
    Location(name: "Melbourne 😷", coordinate: CLLocationCoordinate2D(latitude: -37.8136, longitude: 144.9631)),
    Location(name: "Brisbane 🤪", coordinate: CLLocationCoordinate2D(latitude: -27.4698, longitude: 153.0251))
]
```

Then, change the map to use a different initialiser:

```
Map(coordinateRegion: $coordinateRegion, annotationItems: locationsToDisplay) { location in
    /* Initialise and return a pin here */
}
```

The above won't compile. Inside of the closure body is where we construct and return a pin. A pin is something that conforms to the `MapAnnotationProtocol` which, at the time of writing, is restricted to either a `MapMarker` or `MapPin`. Again, this is all very limiting. Use MapKit if sophistication is what you're after.

Okay so let's return a marker:

```
Map(coordinateRegion: $coordinateRegion, annotationItems: locationsToDisplay) { location -> MapMarker in
    let marker = MapMarker(coordinate: location.coordinate)
    return marker
}
```

This will display a standard map marker that you might be used to seeing on an iOS map. Note the very limited customisation available - you give it a coordinate and can optionally set the tint colour - that's it. No way to mark it with a title, as far as I can tell, and there's especially no way to handle it being interacted with. Very limited practical use-cases here, but that's how you do it if you're interested. To display a `MapPin` (old school!), it's very much the same as above just swap out `MapMarker` for `MapPin`. Similarly, the pins can't be given a title, subtitle, or really any metadata you'd expect to be able to give a pin, so they're only good for displaying things at a high level and not if you want anyone to be able to interact with the pin itself.

The purpose of this post was to demonstrate how to show a marker or pin on a `Map` with SwiftUI. It's extremely limiting for now, hopefully the API's are improved with time.

Because we all like code that can be copied/pasted and played around with, here's a full working SwiftUI view you can use that demonstrates everything mentioned in the article above.

```
import MapKit
import SwiftUI

struct Location: Identifiable {
    let id = UUID()

    let name: String
    let coordinate: CLLocationCoordinate2D
}

struct ContentView: View {
    private static let defaultCoordinate = CLLocationCoordinate2D(latitude: -33.8688, longitude: 151.2093)
    private static let defaultSpan = MKCoordinateSpan(latitudeDelta: 20, longitudeDelta: 20)
    @State private var coordinateRegion = MKCoordinateRegion(center: defaultCoordinate, span: defaultSpan)

    private let locationsToDisplay: [Location] = [
        Location(name: "Sydney 😎", coordinate: CLLocationCoordinate2D(latitude: -33.8688, longitude: 151.2093)),
        Location(name: "Melbourne 😷", coordinate: CLLocationCoordinate2D(latitude: -37.8136, longitude: 144.9631)),
        Location(name: "Brisbane 🤪", coordinate: CLLocationCoordinate2D(latitude: -27.4698, longitude: 153.0251))
    ]

    var body: some View {
        Map(coordinateRegion: $coordinateRegion, annotationItems: locationsToDisplay) { location -> MapPin in
            let marker = MapPin(coordinate: location.coordinate)
            return marker
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```
