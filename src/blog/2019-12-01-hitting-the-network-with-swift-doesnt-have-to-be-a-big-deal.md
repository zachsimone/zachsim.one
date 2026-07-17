---
title: "Hitting the Network with Swift Doesn't Have to Be a Big Deal"
date: 2019-12-01T16:28:07.840+11:00
permalink: "/blog/2019/12/1/hitting-the-network-with-swift-doesnt-have-to-be-a-big-deal.html"
layout: layouts/post.njk
image: "/images/1575178090117/image.png"
---
It's all too common when scanning a Swift codebase to come across the dreaded lines of code `import Alamofire` or `import Moya`. At a point in time, almost any iOS app built will need to send or receive data from an API. The adage is that job of an iOS developer is turning JSON into rectangles on a screen. Sending and receiving JSON is big part of iOS development, and there are a million and one ways to do this.

### Avoiding dependencies

Being dependent on third-party code for your app to work isn't ideal. For side projects it is achievable to have zero dependencies. *Have I mentioned how fast a project compiles without them?* Often in a professional work environment, there are unavoidable requirements to use frameworks and libraries, but it's still possible to minimise dependencies. Using [Alamofire](https://github.com/Alamofire/Alamofire), [Moya](https://github.com/Moya/Moya/), [SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON), or a variety of [other](https://github.com/AFNetworking/AFNetworking) libraries to make requests, or parse responses is common in almost any iOS codebase, but often without good reason. That isn't to say there's no use in any of the aforementioned libraries, but I do think they're often used unnecessarily, and without justification.

### Benefits of avoiding dependencies

There are many reasons why I prefer to avoid dependencies in an iOS codebase, and a few overlap with my reason for disliking networking libraries.

1.  Networking on iOS is easy. This is probably the most important reason, and is something that is easy to overlook. `URLSession` is fantastic, and makes it really easy to perform API requests in an app. `Codeable` is equally great, and makes JSON encoding and decoding a breeze. These are first-party frameworks which make it appealing to ditch the burden that comes with third-party frameworks.
2.  Third-party frameworks are often difficult to debug. Ever tried debugging a request that's gone through Alamofire, potentially another network layer, and the result is handled by a framework such as [RxSwift](https://www.github.com/ReactiveX/RxSwift)? It's next to impossible, and a lot of that pain and hurt is saved by using good ol' `URLSession`.
3.  Third-party libraries add to compile time. They often contain code that isn't related to the specific action or two you're using the library for, and hence slow down compile times unnecessarily. Not to mention using a dependency manager such as [CocoaPods](http://cocoapods.org) will slow things down by virtue of the fact that it exists. The advantage to writing your own networking code is that you only have to write what you need - and that's all the compiler will ever have to compile.
4.  Support. You can update your networking code at any point in time to add, remove, or modify functionality. If a new version of Swift comes out, you can update your code then and there. With third-party dependencies there is no guarantee they'll update at all. And even the well supported ones might be a bit behind. Being in control by writing your own code is always my preferred way of doing things - within reason.

Yes, I'm mentioning `URLSession` a lot. And sure, you can argue that everything eventually uses `URLSession` under-the-hood. But calling it directly is advantageous for the reasons mentioned above. It's a lot easier when your code doesn't go through 14 different layers before finally doing the thing you want it to do.

### The ideal

In my mind, for an app that sends simple HTTP requests back and forth to an API, a network manager should be simple. You should be able to create a request (with the URL, headers, and body), tell the manager what you expect back (typically a data object that can be decoded to a `Codable` object), and it performs the request either successfully or with an error. What I've built suits the needs of my app, [Petty](https://apps.apple.com/au/app/petty/id1253821300), but is generic enough to suit most needs an app might have. As you'll see, there's an element of business logic to it that is unique to the app, but it's separated from the actual API request code - which can be used in almost any app.

### The solution

The solution is straightforward. An `APIRequest` class manages the request - it contains a `Request` object, and has a `performRequest` method can be called to interface with the network. This method asynchronously completes with the Swift `Result` type - meaning it either completes successfully by returning the expected model object, or with an error.

So, it's time to see some code.

### The code

First up, there's a `Request` object. It's initialised with everything needed for an API call - baseURL, relative URL, a HTTP method (GET, POST, etc.), request timeout interval, and finally HTTP headers and a request body - both of which are optional as they aren't needed for every request.

```
// MARK: Request method
enum RequestMethod: String {
    case POST
    case GET
    // Can add additional cases if `POST` and `GET` don't cover all your needs
}

// MARK: Typealias
typealias Body = Data
typealias HttpHeaders = [String: String]

// MARK: Request
struct Request {
    private let baseURL: String
    private let relativeURL: String
    private let method: RequestMethod
    private let timeoutInterval: Double
    private let headers: HttpHeaders?
    private let body: Body?

    init(baseURL: String, relativeURL: String, method: RequestMethod, timeoutInterval: Double = 24.0, headers: HttpHeaders? = nil, body: Body? = nil) {
        self.baseURL = baseURL
        self.relativeURL = relativeURL
        self.method = method
        self.timeoutInterval = timeoutInterval
        self.headers = headers
        self.body = body
    }
}

// MARK: Request extension
extension Request {

    private var requestURL: URL? { URL(string: baseURL + relativeURL) }

    var request: URLRequest? {
        guard let url = requestURL else { return nil }
        var request = URLRequest(url: url)
        request.httpMethod = method.rawValue
        request.httpBody = body
        request.allHTTPHeaderFields = headers
        request.timeoutInterval = 24.0
        return request
    }

}
```

Note how all of the properties are private. After initialising a `Request` object, it has a `request` property which is public - and this is the only property needed to work with in the `APIRequest` class.

The `APIRequest` class is where the magic happens. It takes any type - `T` - so long as it conforms to `Decodable`, and this is the object expected back from the request. It has two public methods - `performRequest` and `cancelRequest` - as well as a few private helper methods. I won't explain it all - feel free to copy and paste this code - but the idea is that the `performRequest` method is called, and the method will either complete successfully with the expected model object, or fail with an `Error` object.

```
// MARK: API Request
class APIRequest<T: Decodable> {

    typealias Completion = (Result<T, APIErrors>) -> Void

    var request: Request
    private var task: URLSessionDataTask?

    init(request: Request) {
        self.request = request
    }

    // MARK: Public API
    func performRequest(completion: @escaping Completion) {

        guard let session = makeSession(completion: completion) else {
            completion(.failure(.requestError))
            return
        }
        task = session
        task?.resume()
    }

    func cancelRequest() {
        task?.cancel()
        task = nil
    }

    // MARK: Private helpers
    private func makeSession(completion: @escaping Completion) -> URLSessionDataTask? {

        guard let request = request.request else {
            completion(.failure(.requestError))
            return nil
        }
        let task = URLSession.shared.dataTask(with: request) { [weak self] data, response, error in
            self?.parseResponse(data, response: response, error: error, completion: completion)
        }
        return task
    }

    private func parseResponse(_ data: Data?, response: URLResponse?, error: Error?, completion: @escaping Completion) {

        if let error = error {
            completion(.failure(.responseError(error)))
        }
        guard let data = data else {
            completion(.failure(.dataError))
            return
        }
        do {
            let decoder = JSONDecoder()
            let responseObject = try decoder.decode(T.self, from: data)
            completion(.success(responseObject))
        } catch {
            completion(.failure(.serialisationError))
        }
    }

}
```

That's it. That's the whole API request manager - a functioning network layer which can be used to easily create a request, and perform that same request.

To put a bow on it, here's the enum I'm currently using for API errors. It could be more comprehensive, but using it will mean the above code compiles.

```
// MARK: API Errors
enum APIErrors: Error {
    case requestError
    case responseError(_ error: Error)
    case dataError
    case serialisationError
}
```

### Application-specific requests

At this stage, requests can be made but further effort is required to truly benefit from the solid foundation. All the code until this point is meant to be generic - and can be used for any app. From here on is where things get application specific, and the example I'm using is what I've done for one of my apps - [Petty](https://apps.apple.com/au/app/petty/id1253821300).

Start by creating a protocol which any future network request must conform to. This protocol uses an associated type which must conform to `Decodable` and is the object type expected to get back from the request. Of course, not every network request will have a response, or expect a `Decodable` response, but you can easily modify things so that the network manager handles a `Data` object, or an empty response. I won't cover that as part of this post. By focusing on returning a decoded JSON object, most use cases are covered. Each `PettyAPIRequest` must have a request which needs to be executed, and an instance of the `APIRequest` class to execute this request. There's also a `getData` method which will go off and make the request, completing with the result. Of course, any class conforming to `PettyAPIRequest` can implement this method however it wants, but the implementation below should cover most needs.

```
protocol PettyAPIRequest: PettyRequest {
    associatedtype ReturnType: Decodable
    var request: Request { get set }
    var apiRequest: APIRequest<ReturnType> { get set }
    func getData(completion: @escaping (Result<ReturnType, APIErrors>) -> Void)

    // All Petty API requests requirer a bearer token, hence the required init with token
    init(with token: String)
}

extension PettyAPIRequest {

    func getData(completion: @escaping (Result<ReturnType, APIErrors>) -> Void) {
        apiRequest.performRequest(completion: completion)
    }
}
```

Until this point things have been quite generic, but here's where it gets application-specific. Any class conforming to this protocol must be initialised with a bearer token, which all API requests in [Petty](https://apps.apple.com/au/app/petty/id1253821300) need, and also must subclass `PettyRequest` which is a class (see below) containing some generic things such as the API key (bad practice, I know, I know), base URL, and some default headers.

```
class PettyRequest {
    let apiKey = Constants.API.Key
    let baseURL = Constants.API.BaseURL
    lazy var defaultHeaders: [String: String] = [
        "Content-Type":"application/json",
        "apikey": apiKey
    ]
}
```

### Real-world use

So, that's all the boilerplate out of the way. It shouldn't take long to get to this point, and have a fully-functioning network layer. You have control over how your iOS application interacts with the network. But now you want to make a request. Let's do that!

One of the requests that [Petty](https://apps.apple.com/au/app/petty/id1253821300) might need to make is a HTTP GET request for the price of petrol at every station in the state of New South Wales. Here's how to create this request in less than 25 lines of code.

```
class AllStationDataRequest: PettyRequest, PettyAPIRequest {

    typealias ReturnType = AllStationData

    private let relativeURL = Constants.API.URL.allPrices
    private var bearer: String
    private lazy var headers: [String: String] = {
        var headers = defaultHeaders
        headers["authorization"] = "Bearer " + bearer
        return headers
    }()

    required init(with token: String) {
        self.bearer = token
        super.init()
    }

    lazy var request = Request(baseURL: baseURL, relativeURL: relativeURL, method: .GET, headers: headers, body: nil)

    lazy var apiRequest = APIRequest<AllStationData>(request: request)

}
```

Hopefully it's self-explanatory, and the simplicity of this code is a result of good foundations laid earlier, but I'll call out a few things:

1.  The `ReturnType` typealias is set to `AllStationData` - a struct which conforms to `Codable` and is the format data is expected to be returned in.
2.  The request is initialised with an authorisation/bearer token. This is specific to [Petty](https://apps.apple.com/au/app/petty/id1253821300), as every request needs this token, but requests in your application might not. Or only some requests might need authorisation, in which it wouldn't be required as part of initialisation.
3.  Note how an `authorization` header is added to the existing `defaultHeaders` which are inherited from `PettyRequest`.
4.  When interfacing with this object, the `getData` method is used. That is inherited from the `PettyAPIRequest` protocol, so its existence isn't immediately obvious, but it's there and it's how requests are made. You can optionally implement it as part of this class, and it will automatically override the protocol implementation.

### Making a request in your code

To use this in your code - in a view model or wherever else you make network requests - it's as simple as initialising the request object, and calling the `getData` method. From there, check the result for success or failure, and do as you like with the result.

```
let request = AllStationDataRequest(with: apiKey)
request.getData { result in
    switch result {
    case .success(let object):
        print("Success. We got \(object) back.")
        // Do with `object` as you like...
    case .failure(let error):
        print("Oh no. Error! \(error)")
        // Do with `error` as you like...
    }
}
```

### What has been achieved?

That's it! (For real this time.) Feel free to use this code in your own projects, or base your own networking layer off of it. Note you will need to make customisations, but the foundations are in place.

So, what have we achieved?

1.  We own the networking layer of our application, with no reliance on a third-party.
2.  The implementation is abstracted away (which is a nice advantage of third-party networking libraries), but we still have full control. The result is neater code throughout the project.
3.  We can easily create a new request object, customise it with request parameters, and use it in various places across the application with only a few lines of code each time.
4.  Cleanly handle both success and failure cases.
5.  Taking full advantage of Swift language features (`Result` type, `Codable`, generics, etc.) to build a flexible interface for network requests.
