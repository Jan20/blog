<!--
date=2022-07-04
topic=RxJS
-->

<img class='full' src='assets/posts/guides/009_rxjs_pipe_operators/thumbnail.png'>

## DebounceTime
The debounce ope
``` TS
public posts: Observable<Post[]>;
private searchSubject: Subject<sting> = new Subject();

ngOnInit(): void {
    this.posts = this.fetchPosts();
    this.searchSubject
        .pipe(debounceTime(250))
        .subscribe((searchTerm) => (this.posts = this.fetchPosts(searchTerm)))
}

ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
}

public searchPost(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
}

private fetchPosts(searchTerm?: string): Observable<Post[]> {
    return this.postService.getPosts(true, searchTerm)
}
```

```HTML
<input (input)="searchPost($any($event.target).value)" matInput>
<div *ngFor="let post of posts | async">{{ post.title }}</div>
```

``` TS
it('should search for a post', fakeAsync(() => {
    spyOn(postService, 'getPosts').and.returnValue(of([Post]));
    type(screen.getByRole('textbox'), 'Angular Basics');
    tick(250);
    expect(postService.getPosts).toHaveBeenCalledOnceWith(true, 'Angular Basics');
}));
```