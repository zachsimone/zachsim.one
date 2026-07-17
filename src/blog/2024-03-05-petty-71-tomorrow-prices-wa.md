---
title: "Petty 7.1: Tomorrow's Prices for WA &amp; CarPlay Map Improvements"
date: 2024-03-05T08:00:00.566+11:00
permalink: "/blog/2024/3/5/petty-71-tomorrow-prices-wa.html"
layout: layouts/post.njk
image: "/images/1709584777409-N0NEBZ01SMJ0T4ABTNQP/hero_full.png"
---
![](/images/3a9d0ffe-d32c-4c8e-9a60-bcb5d46b5ea2/hero_full.png)

It can be difficult to know where to focus your attention as an independent software developer. There are always more ideas and more features to build than you have time for, and being able to prioritise effectively is a skill unto itself. A skill I'm not very good at, but nonetheless.

It was only a month ago that I introduced a [CarPlay app to Petty](https://zachsim.one/blog/2024/2/1/petty-70-introducing-carplay). The initial response was better than I expected, and people seem to really like this feature. It probably doesn't hurt that it's a unique feature amongst fuel price apps in Australia.

One of the bits of feedback from the CarPlay launch that surprised me was the sheer number of requests to add tomorrow's pricing for WA. For those unfamiliar, one state specifically – Western Australia (WA) – makes prices for the next day available from about 2:30pm local time. This is valuable information for motorists and yet another way to help save money. I get requests to add this feature to Petty from time to time, but have always kicked the can down the road as it isn't a frequent request, and the last time I looked there weren't many users from WA. After launching the CarPlay app, I probably got more requests for it in a week than I've had in total until that point. That was enough to get my attention.

After looking at the stats which say that just over 12% of Petty users are in WA – about in line with WA's overall percentage of the Australian population – it seemed like it was finally time to add this feature. In the process of building it, I became increasingly more excited about it. I can see the value in being able to know that you aren't about to fill up only for prices to drop by 20c per litre the next day, or conversely that you should wait until tomorrow because you don't *need* fuel today and you'll save a few bucks tomorrow. After seeing how helpful it is, I'm surprised that people in WA use Petty at all before it had this information!

It's an interesting task to take an app centred around the concept of a single price for a given fuel type at a given station at any given moment. If you're in a state without tomorrow's prices, or in WA at a time before tomorrow's prices are available, nothing will be different. You'll still see today's prices in exactly the same location. What has changed is that once tomorrow's prices are available, you'll see them. In your favourites list, in the station list, in the station detail, and on the map. You'll even see them around the CarPlay interface. Currently tomorrow's prices don't factor into the trends and real-time average price analysis, and I think that's fine. A "Should you fill up" feature has also been added, indicating at-a-glance if today's prices are more expensive, cheaper, or the same as tomorrow's for your preferred fuel type.

Pricing in the other states doesn't work the same way as in WA. Stations elsewhere can change their price at any time with no mandated warning (as far as I know), and I don't see that changing anytime soon. After seeing how cool it is to be able to view prices ahead of time in WA, I'm hopeful it comes to more states around Australia, but I'm not holding my breath. However, if it does, all the systems are in place and tomorrow's pricing could easily be plugged into Petty for a different state.

The 7.1 update to Petty also improves the CarPlay map to show real-time prices for chosen petrol types, instead of just showing station logos as was the case previously. Should they be available, it will show tomorrow's prices as well. This makes it look more like the map on your iPhone. You can also share a link directly to a station from the app (e.g. [https://petty-app.com/stations/1](https://petty-app.com/stations/1)) and it will open in Petty if the app's installed. If it isn't, a webpage with the current prices at that station will open. This makes Petty more useful in more places – beyond just the iOS app.

I hope you like the update – *especially* if you're in WA. If you have questions, or notice any issues with this feature please get in touch via the app, and I'll do my best to get back to you quickly.
