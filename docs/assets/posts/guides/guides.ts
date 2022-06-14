import { Post } from "src/app/modules/blog/models/post"; 

export const guides: Post[] = [
    new Post('guides', 'RxJS', 'RxJS in Angular', 'RxJS (Reactive Extensions for JavaScript) is a library that enables reactive programming in Angular, which is a programming paradigm focusing on processing data streams.', './src/assets/posts/guides/002_introduction_to_rxjs/introduction_to_rxjs.md', 'assets/posts/guides/002_introduction_to_rxjs/thumbnail.png'), 
    new Post('guides', 'Angular', 'Angular on GitHub Pages', 'GitHub Pages is a free hosting service for static websides offered by Github.', './src/assets/posts/guides/001_angular_apps_on_github_pages/angular_apps_on_github_pages.md', 'assets/posts/guides/001_angular_apps_on_github_pages/thumbnail.png'), 
]