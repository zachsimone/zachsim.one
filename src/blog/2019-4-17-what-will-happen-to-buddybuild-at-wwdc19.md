---
title: "What Will Happen to Buddybuild at WWDC19?"
date: 2019-04-17T14:41:57.626+10:00
permalink: "/blog/2019/4/17/what-will-happen-to-buddybuild-at-wwdc19.html"
layout: layouts/post.njk
image: "/images/1555476118671/image.png"
---
When [Apple acquired TestFlight](https://techcrunch.com/2014/02/21/rumor-testflight-owner-burstly-is-being-acquired-by-apple/) in 2014, they integrated it into App Store Connect (called iTunes Connect at the time), but kept the purpose of the service very much the same - allowing developers to easily distribute pre-release builds of their software. I'm curious as to the direction Apple will take with Buddybuild.

I see a few ways it could go. Buddybuild could become a premium CI service, as it was previously, with a monthly or annual fee for developers to use it, with the intention being making money. I don't see this as the most likely outcome, but it's a possibility. Apple tends to build mass-market consumer services when looking to grow services revenue, not niche developer tools.

Alternatively, Buddybuild, the service that we once knew, may return and be integrated into App Store Connect. Developers might have free, or inexpensive, access to a CI/CD service that will run tests for them, build their app, and distribute it where it needs to go automatically. This approach would interest me the most, and I think it's the most likely. The fact that they didn't shut the whole service down upon acquisition shows CI still interests them, and they have plans to continue the service, at the very least for existing customers, but I'm sure that will change. It would also mean Apple is exploring an area they haven't before - they would have direct access to source code, be it hosted by Apple itself, or pulled from a third-party code hosting service such as [GitHub](http://github.com) or [BitBucket](https://bitbucket.org).

A final approach which I believe is plausible would be that they take the technology behind Buddybuild (its integrations, build scripts, and hardware infrastructure) and use it for something else - such as remote code compilation. This could be especially useful should Apple be looking at bringing Xcode to iPad. I could imagine it being a bit like [Google Stadia](https://en.wikipedia.org/wiki/Google_Stadia) but for developers and their Xcode projects.

It's also possible that none of the three approaches mentioned above are the route Apple take. WWDC19 is going to be an interesting conference, and I look forward to seeing what Apple has been up to in the world of CI/CD.
