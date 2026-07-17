---
title: "Parallel Testing in Xcode 10"
date: 2018-06-15T20:43:47.156+10:00
permalink: "/blog/2018/6/15/parallel-testing-in-xcode-10.html"
layout: layouts/post.njk
image: "/images/1529059427815/image.png"
---
##### Parallel testing

At the Apple Worldwide Developers Conference last week, Xcode 10 was announced with a bunch of new features and enhancements to various developer tools. One of the features that caught my eye was parallel testing.

We should all be writing tests for our code. Unit tests run relatively quickly and are used to test small sections of code, generally in isolation. UITests are another form of test that, as the name implies, test the UI of your application. They do this by running through full flows in your app - such as a purchase flow from start to end - ensuring that all the expected UI elements are present and that each button and control works as expected. UITests are useful for catching regressions, and for feeling confident that nothing broke after making a change to your app, but unfortunately can take a while to run. Dozens of 30-second flows in your app add up, and suddenly you might find your test suite taking 30+ minutes to run.

Enter parallel testing.

Previously only available to xcodebuild for separate simulators, and now available for all projects in Xcode, parallel testing allows multiple tests to be run simultaneously, with the main advantage being dramatically shortened XCTest and XCUITest times.

![Screen Shot 2018-06-15 at 8.36.22 pm.png](/images/1529059202751-USBNOYA81KASCFS4I4TI/Screen-Shot-2018-06-15-at-8.36.22-pm.png)

##### How to enable parallel testing

1.  Select your target scheme in Xcode, and "Edit Scheme..."
2.  Find the settings for "Test", and press on the "Info" tab
3.  You'll see a list of your Unit and UI tests, press on the associated "Options..." button
4.  Select "Execute in parallel on Simulator"
5.  Optionally select "Randomize execution order"

##### Running tests in parallel

It's only possible to run Unit tests in parallel on macOS. Both Unit tests and UI tests can be run in parallel on iOS and tvOS.

When running tests in parallel, Xcode will run them on a clone of the same simulator. Most Macs should be capable of running at least two cloned simulators in parallel. Modern Macs with more RAM and more processor cores should be capable of running even more tests simultaneously.

Tests are split up by classes and allocated to each clone of the simulator as Xcode sees fit. What this means is that your tests are only as fast as the longest-running test class. For this reason, it's important to keep each test class as concise as possible and consider splitting tests into as many classes as is practical.

##### Considerations

There are some things to consider now that tests can run in parallel, and optionally, in a random order.

Ensure that tests are able to run independently of one another and that no test relies on the test that comes before or after it to set up or clean up. Each test should be truly independent of all other tests. You are no longer able to ensure that test A will finish before test B begins, so this independence is important.

Performance tests will not achieve maximum performance when running in parallel. Apple suggests putting performance tests in their own bundle and disabling parallel testing for this bundle.

##### Wrapping up

Parallel testing certainly made for an impressive demo during the [Platforms State of the Union](https://developer.apple.com/videos/play/wwdc2018/102/) at WWDC last week. It's something that will save countless hours of development time. Long testing time is something that may discourage additional tests from being written, and anything combatting that is a benefit to software quality going forward.
