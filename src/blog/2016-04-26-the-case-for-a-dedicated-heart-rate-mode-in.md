---
title: "The case for a dedicated Heart Rate ‘mode’ in watchOS"
date: 2016-04-26T13:59:12+10:00
permalink: "/blog/the-case-for-a-dedicated-heart-rate-mode-in.html"
layout: layouts/post.njk
tags: ["Apple Watch","watchOS","watchkit","WWDC","WWDC16"]
image: "/images/1461643152000/image.png"
---
The Heart Rate monitoring features of Apple Watch are simply great. It is that which sets it apart from other smartwatches at the moment (I write while looking sadly at my Pebble Time).

Currently as of watchOS 2.2, Apple Watch measures the heart rate of a wearer in two separate ways: Every 10 minutes in the ‘background’ - giving you an indication of general resting heart rate trends throughout the day, and when the watch is in a dedicated “Workout” mode - meaning a user has told the watch they’re currently exercising and want it to measure their heart rate and activity. The heart rate monitor is surprisingly accurate during a cardio workout, typically only a beat or two per minute off from the elliptical machine at the gym which also reports heart rate. During a dedicated workout, the watch will measure heart rate continuously (updating the reading approximately 10 times per minute, or every 6 seconds). This gives a pleasantly detailed and accurate view of your heart rate during exercise. Unfortunately the heart rate sensor - which shines green LED lights onto a wearers wrist, measuring their heart rate through a process known as photoplethysmography - cannot run continuously throughout the day due to battery life constraints.

The Apple solution to this is to take a “background” reading periodically every 10 minutes, so long as the wearer is still at the time of the reading. This works great for providing a general overview of trends throughout the day.

In a perfect world, the Apple Watch would measure resting heart rate continuously, however we probably won’t reach a point where this is possible for another few years at least. In the meantime, I’d like to propose a dedicated “heart rate” mode for Apple Watch. This mode would allow a user to tell the watch they’d like continuous monitoring of their heart rate for a specified period of time, while acknowledging they understand the watch battery will drain faster than normal during this time. The current solution is to start a workout, however this is less than ideal as a workout is meant for just that - when you’re working out - and only provides a single figure displaying “average” heart rate upon completion. A dedicated heart rate mode on Apple Watch would allow for this continuous monitoring and a nice interface to accompany the data. Perhaps a colour-coded graph displaying all recorded data on your iPhone at the end of the heart rate monitoring period.

There are many use cases for this dedicated heart rate mode - watching live sport, watching a horror movie, during a job interview, or even just wanting more accurate heart rate monitoring at certain times throughout the day (just after you drink a coffee, perhaps?) Personally, I’d love to see the dramatic swing of my heart rate while watching live football and be able to analyse the trends in this data later on - how high did my heart rate jump during extra time? There are undoubtedly endless useful ways in which this technology could be used, and it would be fantastic to see Apple introduce a feature such as this dedicated heart rate monitoring mode for Apple Watch.

Here’s to the changes coming in watchOS 3.0 at WWDC 2016!
