<!--
date=2022-07-04
topic=RxJS
summary=RxJS offers a range of operators of which map, filter and tap get presented.
-->

# RxJS Operators

The core strength of RxJS lies in applying operators on Observables to filter and transform the returned values. RxJS operators are <b>pure functions</b> that never change the Observable objects they are applied on. Instead, they return new Observables that may serve as input for another operator further down the stream. For instance, it is perfectly possible to first filter an Observable to only return odd numbers and then apply a map function on those odd numbers to square them.

## Map

The first and very common operator you might be interested to try yourself is the <code>map</code> operator, which applies a <code>project</code> function to each value emitted by a source Observable. In turn, the operator emits the resulting value as a new Observable. Let's take a look at the example taken from an Angular project depicted below. We aim to extract the category of a blog post that is part of the blog's URL. One way to do so is to inject the activated route into an component's constructor and create a <code>selectCategory()</code> method. That method takes the <code>activatedRoute</code> that exposes an attribute of type <code>Observable&lt;ParamMap></code> containing a URL's parameters.

By applying the <code>map</code> operator on the <code>ParamMap</code> Observable, we can extract the URL's category parameter and return the category as <code>string</code> rather than returning the entire <code>ParamMap</code>. In this example we check that the ParamMap's <code>get('category')</code> method actually returns a string. If not, the default string 'Guides' will be returned. That's achieved by applying the nullish coalescing operator <code>??</code>. Finally, we can be sure that the <code>selectCategory()</code> method depicted below will always return an object of type <code>Observable&lt;string></code>.

```TS
export class BlogComponent {
    public category: Observable<string> = this.selectCategory();

    constructor(private readonly activatedRoute: ActivatedRoute) {}

    private selectCategory(): Observable<string> {
        return this.activatedRoute.paramMap.pipe(
            map((paramMap: ParamMap) => paramMap.get('category') ?? 'Guides'),
        );
    }
}
```

## Filter

The second operator that is commonly seen is the <code>filter</code> operator that is being used as the name implies to filter values based on a condition. Let's assume we are only interested in a certain category such as 'Reviews'. We can chain the <code>filter</code> after the <code>map</code> operator that returns an Observable of a category represented as string. Now, it is easy to write an expression like <code>category === 'Guides'</code> returning true whenever the category is indeed equals to 'Guides'. After having applied the filter operator, we receive a new string Observable only if the category is equal to 
'Reviews'.

```TS
private selectCategory(): Observable<string> {
    return this.activatedRoute.paramMap.pipe(
        map((paramMap) => paramMap.get('category') ?? 'Guides'),
        filter((category) => paramMap.get('category') === 'Reviews')
    );
}
```

## Tap

To conclude our first introduction to operators, let's take a look at the <code>tap</code> operator used to "tap" into a source Observable, performing a side effect and returning the source Observable unchanged. It is useful for debugging purposes, as it may take a <code>console.log</code> function as input to print the value emitted by the source Observable to the console. However, overusing the <code>tap</code> operator leads easily to unintended behaviour that may proof hard to resolve. Thus, it is highly recommanded to use the <code>tap</code> operator primarly for debugging purposes or if we can assume certainty that using the <code>tap</code> operator does not lead to unintended side effects.

```TS
private selectCategory(): Observable<string> {
    return this.activatedRoute.paramMap.pipe(
        map((paramMap) => paramMap.get('category') ?? 'Guides'),
        tap(console.log),
    );
}
```
