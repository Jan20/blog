<!--
date=2022-07-04
topic=RxJS
-->

<img class='full' src='assets/posts/guides/003_rxjs_pipe_operators/thumbnail.png'>

# RxJS Operators
The core strength of RxJS lies in applying operators on Observables to filter and transform the returned values. RxJS operators are <b>pure functions</b> that never change the observable objects they are applied on. Instead, they return new observables that may serve as input for another operator further down the stream. For instance, it is perfectly possible to first filter an Observable to only return odd numbers and then apply a map function on those odd numbers to square them.

## Map
The first and very common operator you might be interested to try yourself is the <code>map</code> operator, which applies a <code>project</code> function to each value emitted by a source Observable. In turn, the operator emits the resulting value as a new Observable. Let's take a look at the example taken from an Angular project depicted below. We aim to extract the category of a blog post that is part of the blog's URL. One way to do so is to inject the activated route into an component's constructor and create a <code>selectCategory()</code> method. That method takes the <code>activatedRoute</code> that provides an Observable <code>paramsMap</code> that is unsuprisingly of type <code>ParamMap</code>.

By applying the <code>map</code> operator, we can extract the category string accessable via the get method provided by the <code>ParamMap</code> and return an Observable of type <code>string</code> matching the method's signature. If the URL does not contain a category parameter, the <code>map</code> should return 'Guides' as default category by using the nullish coalescing operator ensuring that a string gets always returned.

```TS
export class BlogComponent {
    public category: Observable<string> = this.selectCategory();

    constructor(private readonly activatedRoute: ActivatedRoute) {}
        
    private selectCategory(): Observable<string> {
        return this.activatedRoute.paramMap.pipe(
            map((paramMap) => paramMap.get('category') ?? 'Guides'),
        );
    }
}
```

## Filter
The second operator that is commonly seen is the <code>filter</code> operator that is being used as the name implies to filter values based on a condition. Let's assume we are only interested in a certain category such as 'Reviews'. We can chain the <code>filter</code> after the <code>map</code> operator that returns an observable of a category represented as string. Now, it is easy to write an expression like <code>category === 'Guides'</code> returning true whenever the category is indeed equals to 'Guides'. After having applied the filter operator, we receive a new string observable only if the cageory fits.
```TS
private selectCategory(): Observable<string> {
    return this.activatedRoute.paramMap.pipe(
        map((paramMap) =>  ?? 'Guides'),
        filter((category) => paramMap.get('category') === 'Reviews')
    );
}
```

## Tap
To conclude our first view on operators, let's take a look at the <code>tap</code> operator used to "tap" into a source observable, performing a side effect and returning the source observable unchanged. It is useful for debugging purposes, as it may take a <code>console.log</code> function as input to print the value emitted by the source observable to the console. However, overusing the <code>tap</code> operator leads easily to unintended behaviour that may proof hard to resolve. Thus, it is highly recommanded to use the <code>tap</code> operator primarly for debug purposes.
```TS
private selectCategory(): Observable<string> {
    return this.activatedRoute.paramMap.pipe(
        map((paramMap) => paramMap.get('category') ?? 'Guides'),
        tap(console.log),
    );
}
```