<!--
date=2022-07-04
topic=RxJS
summary=This post covers a short example of using RxJS in an Angular controller.
-->

# RxJS in Angular

RxJS (Reactive Extensions for JavaScript) is a library that enables reactive programming in Angular, which is a programming paradigm focusing on processing data streams. The paradigm shines at dealing with frequently changing data points, as it supports chaining operations together, alleviating the need to declare and assign multiple variables. Incoming data points or events can be filtered, modified and processed as they emerge.

## Core Concept

In a conventional, imperative programming paradigm, expressions get called explicitly. Typically, a set of parameters are provided as inputs for an expression, let's assume <code>var a = 1</code> and <code>var b = 1</code> . To calculate the sum of <code>a</code> and <code>b</code>, the following function could be declared:

```TS
sum(a: number, b: number) => { return a + b }
```

After calling the function, the expected result 2 can be assigend to a thrid variable as follows: <code>var c = sum(a, b)</code>. However, the value of <code>b</code> may have changed to <code>2</code> during the execution of the sum function. Traditionally, we had to explicitly reevaluate the function to get the new sum of <code>1 + 2</code>. However, in <b>reactive programming</b>, expressions will be reevaluated automatically, if an input parameter changes. In our example, the value of c would be automatically be updated to <code>3</code> as soon as <code>b</code> get changed from <code>1</code> to <code>2</code>.

## Building Blocks

There are three major building blocks, making RxJS a valuable extention to a wide variety of Angular applications:

1.  Observables: A stream of future values or events that can be observed.
2.  Subscriptions: Oberservables alone do not store any values. They serve merely as conduits for data. By calling the <code>subscribe</code> method on an observable, the values following through an observable are getting fetched.
3.  Pipe Operators: Set of operations including <code>map</code>, <code>filter</code>, <code>concat</code>, <code>flatMap</code>, used to transform data.

## Example

Let's take a closer look at how RxJS can be used in an Angular controller. Assuming we like to display a list of blog posts, we could introduce a <code>PostService</code> that performs a backend request and returns an object of type <code>Observable&lt;Post[]></code>. This is fairly standard as Angular's build in <code>HttpClient</code> used to perform backend calls returns Observables by default.

In this example, we have declared a <code>posts</code> variables that is also of type <code>Observable&lt;Post[]></code>, allowing us to assign the return value of the <code>fetchPosts</code> method to the variable inside the <code>ngOnInit</code> lifecycle hook. As stated above, we need to subscribe to the posts observable in order to actually retrieve the desired block posts. 

Calling the Observable's <code>subscribe</code> method would be possible here, but Angular provides a build-in <code>async</code> pipe for subscribing to a Observables directly in the HTML template. Using the <code>async</code> pipe rather than the <code>subscribe</code> method has the benefit that Angular handles the disposal of the subscription. Normally, we had to manually unsubscribe from an Observable, thus I would almost always recommend to utilize Angular's <code>async</code> pipe. After having applied the async pipe, we can iterate over the blog posts via <code>\*ngFor</code> like over any standard variable. However, if the result of the <code>fetchPosts</code> method changes, the displayed list in the HTML template gets updated automatically without the need to execute the function again.

<b>PostController</b>

```TS
public posts: Observable<Post[]>;

constructor(private readonly postService: PostService) {}

ngOnInit(): void {
    this.posts = this.fetchPosts();
}

private fetchPosts(searchTerm?: string): Observable<Post[]> {
    return this.postService.getPosts();
}
```

<b>Corresponding template</b>

```HTML
<div *ngFor="let post of posts | async">{{ post.title }}</div>
```

This article covered only a simple introduction to a fairly large and powerful library. Please also refer to [Learn RxJS](https://www.learnrxjs.io) as a good source to dig deeper into the topic.
