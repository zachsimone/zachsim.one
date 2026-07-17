---
title: "Tools for an iOS Developer"
date: 2019-01-23T20:24:13.821+11:00
permalink: "/blog/2019/1/23/tools-for-an-ios-developer.html"
layout: layouts/post.njk
image: "/images/1548235415687-HUOYVTWCZG35GPR6KQYE/IMG_2020.jpeg"
---
### Working efficiently with better tools

In the interest of becoming a better, more focused iOS software developer, I've been thinking a bit about the tools I use to work.

iOS developers are fortunate not to need a lot of expensive software to be able to get their job done. Most of the expense associated with developing for the iOS platform comes from having to buy hardware; the Mac, iPhone, iPad, and Apple Watch aren't cheap these days. Once the necessary hardware is acquired, it's possible to get most of our work done with a few, "free" applications. Mainly Xcode and a terminal.

While it's possible to do the job with minimal software, there are some tools which can make life easier, or boost productivity in ways not possible with the default software stack. When iOS development was exclusively a hobby for me, I never gave much thought to paid software tools. It's difficult to justify spending money on these things. Now, working in and around Xcode somewhere between 24 and 40 hours a week (depending on if Uni is in session), I've decided to allocate myself more of a budget for these tools. The benefit is two-fold, I find it easier to do my work - which is always a nice thing - and my increased efficiency benefits the person/people/company paying me to complete said task, as I'm likely to develop and test something faster, and move onto the next thing sooner. A further bonus is that buying these tools for work means I also have access to better tools when working on side projects!

There are many tools out there for iOS developers. I've chosen three that I think are worth paying for, and am quite satisfied using myself.

### Tower 3

Git is the version control system of choice for most iOS developers. The full power of Git can is accessible from the command line, is installed by default on any Mac, and can be used completely for free.

Git can be powerful but scary. No one wants to make a mistake and realise they've deleted a feature that's still in progress! Some people are amazingly skilled at using Git and all its features from the command line, but I am not one of those people. I prefer to use a GUI Git client, find that to be more friendly, and better suits how I use Git. There are a few popular GUI Git clients out there, including [GitHub Desktop](https://desktop.github.com), Atlassian's [Sourcetree](https://www.sourcetreeapp.com), and [Tower](https://www.git-tower.com/). Having used all three, Tower feels the most polished. I feel comfortable using it, and feel in control when performing actions with Git. I like having everything displayed in a GUI, and not having to rely exclusively on the command line.

I recently upgraded from Tower 2 to Tower 3. Some features are "nice to have," such as support for dark mode in macOS. There are other new features which improve my workflow and productivity noticeably. Being able to re-write commit messages, and delete specific commits - generally before having pushed to remote - is fantastic! Completing these tasks from the command line would be tedious, and I'd be fearful of making a mistake! Considering I'm in and out of a Git client all day every day at work, and just as frequently when working on side projects, it makes sense to choose something that I feel comfortable with and can use efficiently.

Although Tower is, under the hood, performing actions that you could do from a command line, or with an alternative free Git client, I see it as a worthwhile tool to have while writing software.

### Charles

[Charles](https://www.charlesproxy.com) is a proxy service which will capture all network traffic from either a physical iOS device or from a simulator while developing, allowing you to inspect the network traffic being sent and received, as well as modify the requests and responses for testing and debugging purposes. There are certainly other ways to mock the traffic coming in and out of your app, but Charles is the most straightforward way I've found to do this. I'm also pretty sure Charles has a lot of great features I don't use, but even just for the basic inspecting and modifying of network traffic it's worth its money. One of my favourite features is being able to "breakpoint" a request, meaning Charles will always stop when a certain request is being sent or received, allowing you to modify it every time.

Using Charles helps me feel a little more confident when working with API calls, knowing how easy it makes it test an app, check edge-cases, or throw data at an app during development before the backend API is ready for use. Though not an essential tool, it's one which I'm glad I have available to use and means there's one less thing to worry about when building iOS apps.

### Sherlock

A newer tool on the scene for iOS developers is [Sherlock](https://sherlock.inspiredcode.io), a simulator UI inspection tool. It's different from the inbuilt Xcode [View Hierarchy Debugger](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/debugging_with_xcode/chapters/special_debugging_workflows.html) as it allows you to change UI on the fly, while the app is running in the simulator. It's a handy tool to test auto layout constraints, change label text and other UI element attributes such as colours, across multiple device screen sizes without having to build and run on a simulator each time. No setup is required. Sherlock handles installing itself on the simulator and attaching to the app you're currently running from Xcode. It's delightfully easy to use. While not an essential tool, I've found it to speed up my workflow dramatically when building UI, and is now a tool I wouldn't want to work without when doing iOS development.

### Wrapping up

Good tools can make your work easier, and more enjoyable. Saving a few minutes at a time, multiple times a day adds up quickly. Everyone values different tools, but recently I've been quite impressed with [Tower](https://www.git-tower.com/), [Charles](https://www.charlesproxy.com), and [Sherlock](https://sherlock.inspiredcode.io), see them as worthwhile purchases, and wouldn't want to be doing my job as an iOS developer without them.
