<!--
date=2022-09-08
topic=Angular
-->

<img class='full' src='assets/posts/guides/012_building_a_blog_from_scratch/thumbnail.png'>

# Building a blog from scratch

There are probably hundreds of ways to create a blog. In the post I like to outline some of my thought processes behind the blog you are reading.

As you may have noticed, I have not used any template for my page but decided to code my blog from scratch. That means, I initialised a new Angular project by simple typing <code>ng new blog</code> in a console, opened the project and started create a simple project structure primarily consiting of a <code>blog</code> module.

Afterwards, I created three components using <code>ng g c <components_name></code>. The first component simply called **blog** takes care of rendering a list of posts inside Angular Material cards which are super easy to create and look somewhat decent without putting too much effort into them. The second components, arguably the most important one is the **post** componet, responsible for visualising posts. The component is as simple and straightforward as it gets, as the component essentially just listens to the activated route, and retrieves a post available as markdown file from the project's assets folder.

**post.component.ts:**
```TS
private fetchPost(): Observable<string> {
    return this.activatedRoute.params.pipe(
        map(
        params =>
            `./assets/posts/${params['category']}/${params['number']}/${params['id']}`
        )
    );
}
```

The corresponding HTML looks similar to the one depicted below. The file utilizes the ngx-markdown library that comes with some drawbacks, but is perfectly suited to parse a markdown file into html.

**post.html:**
```TS
<mat-card class="overviewCard" *ngIf="markdownSource | async as markdownSource">
  <markdown lineHighlight [src]="markdownSource"></markdown>
</mat-card>
```

I was a bit surprised to see how well this first implementation worked. However, I notized a few limiations, especially regarding missing metadata a regular blog provides, such as a post's topic and release date. As I was keen to contain all of a post's content in one markdown file, I needed to find a way to annotate a markdown file with some meaningful metadata. It is certainly not the most elegant solution, but I decided to place a post's metadata directly at the top of every markdown file, followed by a post's thumbnail.

**post.md:**
```TS
<!--
date=2022-06-20
topic=Git
-->
<img class='full' src='assets/posts/guides/post_name/thumbnail.png'>
```

With the metadata to be found at the top of every post, it is rather easy to iterate over all posts, extracting the metadata and use it to display a post's release date and enabling topic-based filtering.