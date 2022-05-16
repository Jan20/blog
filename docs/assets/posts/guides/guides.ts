import { Post } from "src/app/modules/blog/models/post";

export const guides: Post[] = [
    new Post('angular_fundamentals.md', 'Angular', 'Angular Fundamentals', 'This guide provides a **brief overview** of creating a **new Angular application**.', 'guides/001/angular_fundamentals.md', 'assets/posts/guides/001/angular.png'),
    new Post('introduction_to_rxjs.md', 'Angular', 'RxJS in Angular', 'This guide provides a **brief overview** of creating a **new Angular application**.', 'guides/002/introduction_to_rxjs.md', 'assets/posts/guides/002/rxjs.png'),
    new Post('testing_Angular_apps.md', 'Angular', 'Testing Angular Apps', 'Angular provides a set of tools that can be used to test individual functions,components as well as end-to-end flow. This guide dives into common testing use-cases and tries to highlight best practices.', 'guides/003/testing_Angular_apps.md', 'assets/posts/guides/003/angular.png'),
]