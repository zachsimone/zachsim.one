---
title: "CGM Diaries: Day 2"
date: 2017-12-05T20:34:51.652+11:00
permalink: "/blog/2017/12/5/cgm-diaries-day-2.html"
layout: layouts/post.njk
tags: ["CGM Diaries"]
image: "/images/1512466492168/image.png"
---
*I feel the need to begin by stating that this is in no way a complaint about the Dexcom G5 continuous blood glucose monitor and that I am extremely fortunate to be wearing such a device that gives me continuous, real-time data. It works well. Being able to see this data in real time will undoubtedly lead to better overall control. It's already saved a hypo. This post is simply what I've discovered when trying to write software based on the data provided by the Dexcom.*

As a software developer, the thought of the data collected by the Dexcom is exciting. The Dexcom iOS app works well but isn't perfect. That's okay as long as there's access to raw data. In theory, access to all of the readings off of the sensor would allow me to build an entirely custom app for viewing real-time glucose readings on both iPhone and Apple Watch. This theoretical custom app would also include support for my preferred Apple Watch complication, as well as more granular control over notification and particularly the sounds they make. Another possibility would be a custom companion app, so that my parents could check in with my glucose level overnight. There are countless possibilities.

#### HealthKit

My first thought was to build something that pulls data from HealthKit and work with it that way. The Dexcom app currently writes data to HealthKit at a delay of an almost-perfect three hours. I addressed that in [yesterday's post](https://www.zachsim.one/blog/2017/12/4/cgm-diaries-day-1). While that is okay for an app that analyses longer-term data and trends, it isn't helpful for the projects I had in mind for today, with the goal being to use data that's as real-time as possible.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Googled this not expecting anything relevant to come up. The more you know. <a href="https://t.co/d8oFoSl6Qr">pic.twitter.com/d8oFoSl6Qr</a></p>— Zach (@zachsimone) <a href="https://twitter.com/zachsimone/status/937825597618655232?ref_src=twsrc%5Etfw">December 4, 2017</a></blockquote>

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

#### Dexcom API

A quick Google search this morning for "dexcom api" lead me to realise they do have a way for this data to be accessed by third parties, so I decided to play around with it. Many hours later (too many of which spent getting the authentication right), I wondered why the simple app I'd built to return data captured in a given period wasn't working. That's when I came across the following on the Dexcom website.

![IMG\_1.png](/images/1512466464524-YAIJR01IORZ2BB64Z20V/IMG_1.png)

That explained why today's efforts were failing. It's disappointing as a developer, but I'm sure there are valid explanations as to why. As an [FDA approved](http://www.businesswire.com/news/home/20170607005412/en/DexCom-Announces-FDA-Approval-G5-Mobile-App) device, there are processes in place, and lots of regulation they have to adhere to before anything gets done. I can also confirm that this problem can't be addressed by simply changing your Dexcom account address to a United States one.

#### Where to from here

I'm a little deterred knowing that there isn't a reliable way to access real-time data from the Dexcom sensor. It doesn't matter much - the official Dexcom app works reliably and is enough for most people most of the time. A possible next step is to try and read data straight from the Dexcom sensor via Bluetooth. Some [quick searching](https://github.com/LoopKit/xDripG5) earlier this evening tells me this may be possible, but that's a project for another day.
