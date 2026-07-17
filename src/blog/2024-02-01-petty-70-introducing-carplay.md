---
title: "Petty 7.0: Introducing CarPlay"
date: 2024-02-01T07:00:00.184+11:00
permalink: "/blog/2024/2/1/petty-70-introducing-carplay.html"
layout: layouts/post.njk
image: "/images/1706582564600-FHWM6SCS24PQGTGUCSGD/introducing-petty-carplay-hero-1.png"
---
Today I'm excited to announce the release of v7.0 of Petty with brings a major new feature to the app: support for [Apple CarPlay](https://www.apple.com/au/ios/carplay/).

![](/images/69124347-1738-4f5f-be3d-16357dba8fe7/introducing-petty-carplay-hero-1.png)

[Petty](https://petty-app.com) is an iOS app I've built and maintained for over 6 years, and features real-time petrol pricing and trends for various states around Australia. At the time of writing all states and territories except for Victoria and the Northern Territory are supported. Petty helps you find stations nearby, and to keep on top of prices at your favourite regular stations. You can see where we are in the price trend cycle, to help make an informed choice about if it's a good time to fill up.

One of the more common requests I get for Petty is for adding CarPlay support. It makes sense to want to check fuel prices in the place you probably think about them the most – in your car. For a while it wasn't possible, but fortunately [as of iOS 16](https://appleinsider.com/articles/22/06/10/hands-on-everything-new-with-carplay-in-ios-16), Apple introduced more allowed app types including "Fuelling".

There were no issues being granted an entitlement to build to support CarPlay, and over the last few months build it is exactly what I've done. Without going into too much detail, I immensely enjoyed the development experience. It's quite different from building an iOS or watchOS app. CarPlay apps must choose from standard UI templates, with only certain templates being available for different types of apps. Put differently, there are guardrails in place, you must stick to certain UI styles and types, and you can't place whatever content you want at any arbitrary point on screen into a CarPlay app. It makes sense as there are safety considerations when designing an app designed to be used by someone behind the wheel (while parked and stationary, of course). The limitations mostly don't affect Petty as it's an app with lists of content, and places marked out on a map – both of which are templates supported by CarPlay. The way filters are edited and applied in CarPlay is a bit awkward, but that's about the only compromise I had to make, and hopefully it isn't UI you interact with very often.

Overall, I'm pleased with how it turned out. If you're familiar with Petty, its CarPlay support offers all the features you'd expect:

1.  View prices at your favourite stations
2.  Add/remove favourites
3.  Get directions
4.  See nearby stations in a list and on a map
5.  Filter stations by fuel type, state, etc.
6.  View current average prices.

If you use and like Petty, I'm almost certain you'll love using it in your car. As far as I know, Petty is the only app with Australian fuel prices to offer a CarPlay app. It is truly a very nice experience. CarPlay is considered a premium feature of Petty, and as such an active subscription is required to use it.

If you have any feedback or suggestions, feel free to get in touch via the Petty iOS app – I'm happy to chat. Thank you to all the beta testers who provided early feedback and helped me work out what the most important features are when using Petty in your car.

*You can [download Petty on the App Store](https://apps.apple.com/app/apple-store/id1253821300?pt=1448096&ct=carplay-intro-post&mt=8).*

![](/images/66a5e852-7ef2-4099-a2cb-27e245632008/introducing-petty-carplay-hero-2.png)
