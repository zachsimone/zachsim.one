---
title: "Experimenting with App Store Search Ads"
date: 2017-11-16T05:00:00.280+11:00
permalink: "/blog/2017/11/15/experimenting-with-app-store-search-ads.html"
layout: layouts/post.njk
image: "/images/1510698366378-HQOQ2CYIDR4WXYMHMMUI/Screen-Shot-2017-11-14-at-2.46.26-pm.png"
---
#### What are Search Ads

App Store Search Ads have been around since [October of 2016](http://appleinsider.com/articles/16/09/28/apple-activates-search-ads-ahead-of-oct-5-launch-gives-developers-100-credit-for-first-campaign). Apple describes them as, "An efficient and easy way to promote your app at the top of relevant App Store search results." They were only shown in the U.S. App Store up until April of 2017 when they were introduced [to the UK, Australia, and New Zealand](https://developer.apple.com/news/?id=04192017a). Since then, they've been added [to the Canadian, Mexican, and Swiss App Store](https://developer.apple.com/news/?id=10102017a), bringing the total number of App Store markets with Search Ads to 7.

![Here's how Petty's Search Ads look on the App Store](/images/1510697158608-1J95HJMVIVN80UQEHXG0/Screen-Shot-2017-11-14-at-2.46.26-pm.png)

*Here's how Petty's Search Ads look on the App Store*

#### Petty

I make [Petty](https://zachsim.one/projects/petty) which is an app for iOS and Android that helps New South Wales (NSW) drivers find affordable petrol nearby. [Petty came about](https://www.zachsim.one/blog/2017/7/27/introducing-petty) because I thought the NSW Government's petrol price dataset looked cool and knew that it was the most accurate one around. At that stage the best tool one could use to view prices from the same database was to use a website, called *FuelCheck*, run by the NSW State Government. I thought the idea of a decent native app, as opposed to having to visit [fuelcheck.nsw.gov.au](https://www.fuelcheck.nsw.gov.au) frequently was appealing.

#### FuelCheck

About a month ago the NSW Government [launched FuelCheck in the form of a mobile app](https://www.nsw.gov.au/your-government/the-premier/media-releases-from-the-premier/new-fuelcheck-app-to-save-motorists-money-at-the-bowser/) for iOS and Android. Its release was inevitable. As best I could tell, it "soft launched" on the App Store and Google Play a few weeks prior, but the hard launch date was the 11th of October, 2017.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Today we launched the FuelCheck app which shows motorists live fuel prices, helping them save money at the bowser. <a href="https://t.co/LsLfkqqYnM">https://t.co/LsLfkqqYnM</a></p>— Gladys Berejiklian (@GladysB) <a href="https://twitter.com/GladysB/status/917903141718212608?ref_src=twsrc%5Etfw">October 11, 2017</a></blockquote>

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The first I heard about the launch was in a [Tweet by the NSW Premier](https://twitter.com/GladysB/status/917903141718212608), [Gladys Berejiklian](https://www.gladys.com.au).

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">If you don't like maps, I know an app. 😏 <a href="https://t.co/Qmb3zCSEjz">https://t.co/Qmb3zCSEjz</a></p>— Zach (@zachsimone) <a href="https://twitter.com/zachsimone/status/917907309526892544?ref_src=twsrc%5Etfw">October 11, 2017</a></blockquote>

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Naturally, there was a lot of attention given to FuelCheck. Petty and FuelCheck are two different apps and Petty has things to offer that FuelCheck doesn't, including showing the [time prices were last updated at nearby stations](https://twitter.com/zachsimone/status/918197692865552384), [an Apple Watch app, notification centre "Today" widget](https://www.zachsim.one/blog/2017/9/19/petty-11), and - as I Tweeted at the time - [assurance that you aren't using something made by the government](https://twitter.com/zachsimone/status/918198125512204288).

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Have you been sherlocked by Gladys? I wouldn’t worry. I’m sure it will be just as unusable as every other NSW government IT project ever.</p>— David Walsh (@DavidAWalsh) <a href="https://twitter.com/DavidAWalsh/status/918082801571786754?ref_src=twsrc%5Etfw">October 11, 2017</a></blockquote>

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

It was half-jokingly suggested by a friend of the blog (who didn't get a say in their friend of the blog status) [Pat Murray](https://twitter.com/_patmurray) to buy Search Ads on FuelCheck's search terms. That evening, I set up an ad campaign and did precisely that.

#### Search Ads for Petty

To provide some context, Petty is a free app with optional in-app purchases (IAP). Most of its (insignificant) revenue comes from the IAP to unlock "premium" mode - removing ads and getting extra features. The rest is from an optional tip jar. The money made on display ads is so small it might as well be a rounding error. It's worth noting that any money or dollar figures mentioned are in Australian dollars (which, for the fun-fact enthusiasts among you, is the [fifth most traded currency](https://www.finder.com.au/australian-dollar-still-the-worlds-fifth-most-traded-currency). The ads for Petty were only shown to customers who have not previously downloaded the app, and those who were located in Sydney, Australia.

#### The ad campaign

I hadn't run a Search Ads campaign since Apple [gave $100 in free credit at launch to every developer](http://appleinsider.com/articles/16/09/28/apple-activates-search-ads-ahead-of-oct-5-launch-gives-developers-100-credit-for-first-campaign) encouraging them to try it out. Early on it was established that I was only willing to throw $30 at the ad campaign and that the ads were going to run on the iOS App Store only despite there also being an Android version of Petty. $30 sounded like a nice number - small enough that it didn't matter if it resulted in zero additional revenue, but enough to gather some data with. I expected the ad campaign to be over sooner than it was, as maximum daily spend was set to $7.00. It took almost a full month for the $30 budget to be exhausted.

![Here's a breakdown of the spend per week](/images/1510697451800-T39KFLANRWMPND14HVJN/spend_per_week.png)

*Here's a breakdown of the spend per week*

#### Results

The ad campaign finished with 927 ad impressions, and 168 taps on those ads which converted into 101 installations of the app. This gives a tap through rate (TTR) of 18.12%, and a conversion rate (CR) of 60.12%. I'm particularly impressed with the CR which shows that a majority of people pressing the ad were interested, and went on to download it. There isn't much public data I can compare this to, but it's slightly higher than what [early results for Search Ads showed](http://www.idownloadblog.com/2016/10/14/app-store-search-ads-metrics/) - a good sign overall.

#### CPA

The most important metric when running an online ad campaign for an app is the cost per acquisition (CPA) of a customer. This campaign saw an average CPA of $0.30, which is lower than I expected, even for a free app.

CPA is an important metric because it tells you whether or not your campaign is worthwhile. The marginal cost of an additional customer of your app is almost zero. In a simplistic model, take average cost per customer (such as data, and server expenses) away from average revenue per customer, and you're left with a bit more than the amount you can afford to spend to acquire a new customer.

![These keywords were the only three to see meaningful results ](/images/1510697559224-ND73O72D3PY75JI4LXPQ/popular_keywords.png)

*These keywords were the only three to see meaningful results*

#### Keywords

The ad campaign began with only a few keywords: petrol prices, fuelcheck, fuel check, and fuel watch. Throughout the month the ads were running, I increased the number of keywords that ads were running against. At the end of the campaign, only three keywords generated more than 100 impressions, and more than 5 installs each. They were: petrol prices, petrol, and fuel watch.

![Ads\_Android\_iOS.png](/images/1510697958500-DZ3N8TOFOBKNHIV7HTN1/Ads_Android_iOS.png)

Interestingly enough, ads for Petty did not score so much as a single impression on either "fuelcheck" or "fuel check" - the two most important keywords set. I know the Government themselves were bidding directly on that keyword, as were 7-Eleven with [their fuel app](https://www.7eleven.com.au/fuel-app), and their default CPT bid was likely a lot higher than the $2.00 I set for Petty ads.

![After a few days, "fuel watch" was trending, but not, "fuelcheck."](/images/1510698082660-XIGBO77XOK5S28HOCIAN/fuel_watch_trending.jpg)

*After a few days, "fuel watch" was trending, but not, "fuelcheck."*

That means these ads weren't shown to people who were visiting the App Store and searching for FuelCheck directly. The ads likely were shown to people who had heard about the Government's app but weren't sure what it was called. It is interesting that a trending search term on the App Store only three days after the launch of FuelCheck was "fuel watch." It trended for about 24 hours, and as you can see from the data above, that was the single most popular search term for Petty's ads during the campaign.

#### Wrapping up

There are a few key points to take away from this experiment. Search Ads on the App Store work. Unlike Facebook or Google Search ads, where you pay $20 only to get the email, "Your campaign has ended, and your page has ONE new like!" Your mileage may vary, but the $30 I spent resulted in just over 100 new customers, at a cost to me of $0.30 per customer. As far as CPA goes, it was an effective means of advertising. Another thing to take out of this is that you don't need to spend a lot of money to see results. $30 was enough in this instance, and it lasted nearly a month. $20 probably would've been just as fine. Play around with different ads and keywords to figure out what works for you and your app. Run an inexpensive campaign to figure out what your CPA is, and go from there. I also learnt it's difficult to outbid the "big guys." They're almost certainly going to bid higher on the popular terms, such as "FuelCheck," so it's important to find some moderately popular, niche keywords ("fuel watch," in this case) to see results.

There's more data that you can take from a Search Ads campaign and more detailed analysis to be done on the data than I've written here. I hope this provides a good overview of what to expect when you run a Search Ads campaign and how it can be an inexpensive way to attract more customers to download your app.
