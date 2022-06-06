<!--
topic=RxJS
-->
<img class='full' src='assets/posts/guides/002_introduction_to_rxjs/thumbnail.png'>

# RxJS in Angular
RxJS (Reactive Extensions for JavaScript) is a library that enables reactive programming in Angular. Reactive programming is a programming paradigm that focuses on the automatic propagation of change in data streams. A data stream can any chain of operations or events emitted over time.

## Core Concepts
In an imperative programming setting, expressions get called explicitly with one or more parameters. After an expression is evaluated a result, computed based on the parameters that were present when the expression got invoked, gets returned.

Now, let's assume that one or more parameters have changed during the execution. In an imperative programming setting, we had to explicitly reevaluate the expression to get an updated result. However, as Reactive programming addresses 

RxJS builds on the concept of event streams. An event can be a user input, such as a <code>click()</code> command or response provided by an http client. In RxJS, an event stream is captured by an <code>Obervable</code> that listens either to user inputs or values provided by the backend. An Observable alone just defines the event stream, but does not return any values after having been defined. For actually lisening to an event stream, Observables provide a <code>subscribe</code> method, that requires a callback function as input.

```TS
public schemas: Observable<BoSchema[]>;

ngOnInit(): void {
    this.schemas = this.fetchSchemas();
}

private fetchSchemas(searchTerm?: string): Observable<BoSchema[]> {
    return this.cloudRestService.getSchemas(true, searchTerm)
}
```

```HTML
<div *ngFor="let schema of schemas | async">{{ schema.alias }}</div>
```

## Unsubscribing from Observables
Subscriptions to Observables are not terminated automatically. 


## Debounce
``` TS
public schemas: Observable<BoSchema[]>;
private searchSubject: Subject<sting> = new Subject();

ngOnInit(): void {
    this.schemas = this.fetchSchemas();
    this.searchSubject
        .pipe(debounceTime(250))
        .subscribe((searchTerm) => (this.schemas = this.fetchSchemas(searchTerm)))
}

ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
}

public searchSchema(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
}

private fetchSchemas(searchTerm?: string): Observable<BoSchema[]> {
    return this.cloudRestService
        .getSchemas(true, searchTerm)
        .pipe(tap((schemas: BoSchema[]) => (this.isOffineOrError = !schema ? true : false)))
}
```

```HTML
<input (input)="searchSchema($any($event.target).value)" matInput>
<div *ngFor="let schema of schemas | async">{{ schema.alias }}</div>
```

``` TS
it('should search for a schema', fakeAsync(() => {
    spyOn(cloudRestApiService, 'getSchemas').and.returnValue(of([BO_SCHEMA]));
    type(screen.getByRole('textbox'), 'Ticket');
    tick(250);
    expect(cloudRestApiService.getSchemas).toHaveBeenCalledOnceWith(true, 'Ticket');
}));
```

# Pipe Operators

### Map

### Filter

### Tap



### Pure Functions
Funtions, that always return the same result for the same input parameters,
without causing any side effects, such as modifying global variables.