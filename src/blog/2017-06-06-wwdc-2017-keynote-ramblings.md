---
title: "WWDC 2017 Keynote Ramblings"
date: 2017-06-06T16:11:08.427+10:00
permalink: "/blog/2017/6/6/wwdc-2017-keynote-ramblings.html"
layout: layouts/post.njk
image: "/images/1496729301050-YWSTKWRKU9CKWHCYDOVY/wwdc_sj_keynote_tim-cook.jpg"
---
Most recent Apple presentations have been relatively fast-paced, but [this morning's WWDC Keynote](https://www.apple.com/apple-events/june-2017/) was the most rushed event I remember in a long time. Tim Cook came out and did his usual brushing off of the "Apple updates," other than to say Apple is doing just fine. It was funny the first couple of times he said it on stage, but Apple has now used this joke a few too many times for my liking. Just don't mention the "updates" at all. There were overarching themes of machine learning and privacy throughout the whole keynote, across every product line. The sheer volume of new APIs and features announced means that if you're a WWDC attendee who didn't have any questions for Apple engineers going into the conference, you almost certainly do now. This post doesn't aim to cover all announcements, but just the main things that I found interesting. If any of it is incorrect, I apologise as this mountain of information is still new and will take a while to digest.

It was made known from early on that Apple were presenting six different items to the audience today, with the obvious ones of tvOS, watchOS, macOS, and iOS made known from the beginning.

### tvOS

tvOS was brushed over so quickly, all I remember from it is that Amazon content is coming to the Apple TV. They didn't have a lot else to say but did mention there will be more on tvOS later in the year. It's likely there will be a new Apple TV in September, and Apple will talk more about it then.

### watchOS

watchOS 4 was up next. I wasn't expecting much from watchOS this year, after last year's massive updates and major rethink of most aspects of the system, from its design to the way you interact with it. It was pleasantly surprising to learn Apple had made some solid improvements to watchOS over the last nine or so months - more than I was expecting, anyway. I'm a fan of the new Siri interface on the watch, based around "cards" that show you relevant information throughout the day, changing depending on your calendar and time of day. This personalised Apple Watch experience contributes to the uniqueness of the device. After all, it is something worn on your wrist for anywhere between 12 and 23 hours a day and should be a representation of the wearer.

It's been clear for a while that the Apple Watch's strengths lie in the health and fitness space, and Apple has only improved that with watchOS 4. When in workout mode, audio controls are no longer only accessible by exiting the Workout app and opening the playback controller. Instead, audio controls are accessible by swiping to the right as another page inside of the Workout app. There's a new High Intensity Interval Training activity type, which is supposed to improve the accuracy of the heart rate tracking for CrossFit type workouts. Up until now, the Apple Watch heart rate monitor hasn't been particularly accurate in these situations, which has an impact on the accuracy of the active energy burnt during a workout according to the watch.

The activity rings for energy, exercise, and stand can become addicting, especially as you try to keep a streak alive. People love to "fill the rings" on their Apple Watch. As of watchOS 4, Apple Watch offers customised daily inspiration, and even an evening encouragement to help you get across the line and achieve the goal. As long term motivation, there are also different monthly challenges. It was mentioned in the keynote that all of the suggested achievements are realistic as they're custom to each wearer, and based on past results.

Health integration with a continuous glucose monitor was mentioned, meaning these devices can sync data directly to HealthKit via Bluetooth. I hope this was a nod towards the heavily-rumoured glucose monitoring in a future model of Apple Watch. As of today, there is no first party sleep tracking. I expect this to come alongside the next update to Apple Watch hardware.

### macOS

The next version of macOS was announced at WWDC. It's version 10.13 and is named, "High Sierra." From what I saw on Twitter, most people - myself included - thought this was a joke when Craig Federighi announced it, but once it was repeated a few times by other presenters, we realised he wasn't joking. It's a weird name and will take some getting used to, but ultimately it's just a name and doesn't matter. macOS High Sierra brings the new Apple File System (APFS) to macOS. This is after a very successful rollout to iOS devices earlier this year with the iOS 10.3 update. There weren't many new features announced with High Sierra - it's essentially what OS X Snow Leopard was to Leopard. There were some improvements to the Photos app on macOS. I'm sure they're nice. The Mac is now compatible with virtual reality, something which Apple have been accused of ignoring up until now.

Also announced was a nice set of improvements to Safari. The two big ones were better privacy with Advanced Tracking Prevention, and no more auto playing videos. An example of the former is the situation where you view a product on a site and ads for it follow you around the web. The latter is self-explanatory.

It's also worth noting that there are now iCloud storage family plans available with either 200GB or 1TB of iCloud space. The biggest announcement as far as Macs were concerned was upgraded iMacs, MacBook, and MacBook Pro, as well as a price drop for the entry level iMac and MacBook Pro without Touch Bar. These were all updated to Kaby Lake processes. Apple also previewed an upcoming iMac Pro which comes in Space Grey and is essentially what we'd expect from a new Mac Pro plus a screen. It's worth noting this isn't the new Mac Pro - that's apparently still coming. The iMac Pro is shipping later this year. Oh, and the ancient MacBook Air got a processor speed bump. The more you know.

### iOS

As expected, iOS 11 was announced and of the four software platforms received the largest amount of attention and stage time. There's a new design language, and I'm not a fan. The trend seems to be towards large title bars at the top of most table views within an app, which feels weird as if I'm in Messages I don't need a constant reminder of that fact by a big "Messages" header. It's also worth mentioning that signal bars for mobile signal strength have triumphantly returned (they were removed in iOS 7, for signal "dots"), and control centre is customisable. I know plenty of people who will be excited by the ability to add a mobile data toggle to control centre. The design language is certainly different but is an extension of the design changes started in iOS 10. I think there's a lot of refining still to go and won't be surprised if we see subtle changes to the design of iOS 11 right up until release. The card-based UI isn't as prominent throughout the OS as I thought it might be, and for now only looks like only the App Store was redesigned with a card-based design. I might've missed it, but there also doesn't seem to be a UIKit API for card based "popover" views - similar to what Apple have done in the Music app, and what [Overcast](https://itunes.apple.com/au/app/overcast-podcast-player/id888422857?mt=8) has done with its "Now Playing" view.

One of my favourite new features is Do Not Disturb while driving. With iOS 11, iPhone uses its smarts to determine when you might be driving and won't show you notifications. It is possible to manually override this setting, say if you are a passenger, but I do hope drivers are sensible enough to leave it enabled. It is beneficial for the safety of everyone on the road. Distracted driving is a major issue, and this is a small way to help that.

Another favourite of mine is that messages now sync via iCloud. Until now, messages have been stored locally on each device, not on iCloud (for longer than about 14 days anyway), and when you set up a new device without a backup, your messages start from scratch. This all changes with iOS 11/macOS 10.13 - messages are stored and synced with iCloud. This means that not only are all your messages there on every new device you set up but because they are stored on iCloud fewer messages need to be stored locally. This will be a huge space-saver for many, especially those with 16GB or 32GB phones. Telegram's done this for as long as I can remember. Messages are always there when you sign into a new device, and they don't take up a lot of local storage because most are stored in the cloud. If Apple implements it half as well as Telegram, this feature will be a success.

Along with the aforementioned card-based redesign, the App Store was improved for developers with enhancements such as phased release/rollout of new app versions and auto-renewal with Apple Pay. I'm a fan of the pace with which changes and improvements have been rolling out to the App Store and iTunes Connect in the last 12 or so months.

The introduction of iOS 11 ended with a bang, with the announcement of ARKit - which brings augmented reality to iPhone/iPad via a developer API. It certainly seems promising, and Tim Cook has previously said he [sees AR as the future](https://www.theverge.com/2017/2/10/14581428/apple-tim-cook-ar-vr-product-reveal-interview), so it's good to see Apple addressing this. I don't have a lot to say on this now, but I am excited to see how it's used and what developers come up with in the coming months.

### iPad

The next part of the presentation was devoted to iPad. I don't own an iPad but nevertheless was pleased to see Apple address so much time to it. Despite declining sales, they continue to have faith in the iPad as a product. It missed out on any major software update last year, so improvement this year was overdue. With iOS 11, it feels as though the iPad is finally putting on its big boy pants and gaining desktop features that are useful. Drag and drop, the dock (which is now used to switch apps), the ability to run three apps simultaneously, and the Files app are all major improvements that bring the iPad closer in capability to laptop and desktop computers, without the rest of the clunky OS.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">They’re underselling 120Hz. It looks like real life.</p>— Jeff Nadeau (@jnadeau) <a href="https://twitter.com/jnadeau/status/871800380115435520">June 5, 2017</a></blockquote>

<script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The 12.9" iPad Pro got updated with the new display technology as well, but I get the feeling it isn't selling as well as Apple would like it to. The 10.5" iPad feels like a happy middle ground for Pro users. The cheaper, entry-level 9.7" iPad still exists for casual iOS users, but the 10.5" is the "Pro" workhorse iPad for professionals who want to get work done. I quite like the comment that iPad is for content consumption, but iPad Pro is for content creation. That isn't strictly true, but it's a general rule. At this stage, I could almost do all of my Uni work on an iPad. The hardware is powerful enough, and iOS is finally capable of adequately managing documents and moving data around between apps for this to be possible. The only exception is when I have to use software development IDE's.

### HomePod

It's rare to have a WWDC keynote littered with hardware announcements, let alone entirely new products. HomePod is a new smart speaker for the home, with emphasis on the stereo quality. It doesn't feel like a direct competitor to a product such as Google Home. Google Home aims to be a smart assistant, whereas HomePod is first and foremost a fancy way to play Apple Music in the home. Siri is just a nice addition to this device, but not its primary feature. Apple emphasised the tech behind the audio quality, which is supposed to be impressive.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I'd say Beats is alive and well at Apple, but Beats don't sound that good. HomePod seems to have a significant focus on audio quality. <a href="https://twitter.com/hashtag/WWDC?src=hash">#WWDC</a></p>— Zach (@zachsimone) <a href="https://twitter.com/zachsimone/status/871808294863503360">June 5, 2017</a></blockquote>

<script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Let's hope HomePod isn't too bass-heavy.

It is worth noting there is no developer SDK for this product, meaning developers can't (yet, anyway) write apps that run on HomePod. Between this and the fact that it isn't shipping until December, it makes me wonder why Apple introduced it at a *developers* conference. The only reason that comes to mind is that they wanted to get out ahead of the competition, and perhaps hope to put a stop to sales of competing products while people wait for the release of HomePod. Personally, I probably won't buy one of these. I can see it sitting in the kitchen or living area of a house to play music, podcasts, or audiobooks that multiple people wish to listen to at once, or just for some ambient music when guests are over. In my case, my family has a nice sounding Bose stereo in the kitchen that we can use when we want background noise or music in the house, and we all have access to Siri on our iPhone, so I don't see this as a product that would be useful in our case. Perhaps a second or third generation HomePod might be more compelling. It's an interesting answer to the question, "What can Apple do when phone innovation is slowing?" As a consumer product company, it's wise to make an attractive household accessory that extends the capabilities of Siri outside of the phone, watch and desktop, while also increasing 'lock-in' and the value of the Apple ecosystem. It's yet another device that Apple fans own, and almost certainly guarantees an Apple Music subscription - leading to higher service revenue for the fruit company.

### Platforms state of the union

After the Keynote, WWDC attendees go off to lunch and then go back into the conference centre for another presentation called Platforms State of the Union. It's essentially a developer-focused presentation, as the main keynote has a target audience of the general public and members of the press. I'm still getting familiar with everything announced during the State of the Union, but from what I'm familiar with, there's plenty to be excited about:

-   Swift 3 and Swift 4 code can be compiled in the same project.
-   Wireless debugging, meaning developers no longer need to plug their iPhone or iPad into their Mac via a cable to run, test, and debug their apps.
-   Initial impressions of Xcode 9 are that it's fast, and has plenty of features that help speed up the process of writing Swift.
-   Refactoring is now a feature of Xcode 9.
-   There is now a wider range of compiler warnings which help to help developers write better code. For example, the compiler will warn you if you make a call that updates UI on a background thread.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">This is making me want to refactor code for the fun of it. <a href="https://twitter.com/hashtag/WWDC?src=hash">#WWDC</a></p>— Zach (@zachsimone) <a href="https://twitter.com/zachsimone/status/871846387062685696">June 5, 2017</a></blockquote>

<script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

There was a lot of information to digest this morning from the WWDC Keynote and State of the Union address. There's plenty I haven't had time to explore yet, but initial impressions are that all of these incremental changes will make day-to-day iOS app development more of a joy for hundreds of thousands, if not millions, of iOS developers worldwide.
