import { Post } from '../../../app/modules/shared/models/post';

export const course: Post[] = [
  new Post(
    'course',
    'Angular',
    'Beginners Guide to npm',
    'Gives a brief introduction to npm and its most commonly-used command-line commands.',
    'assets/posts/course/introduction-to-npm/introduction-to-npm.md',
    'assets/posts/course/introduction-to-npm/thumbnail.svg',
    '2023-04-13',
    '/course/introduction-to-npm'
  ),
  new Post(
    'course',
    'RxJS',
    'RxJS Operators',
    'RxJS offers a range of operators of which map, filter and tap get presented.',
    'assets/posts/course/rxjs-pipe-operators/rxjs-pipe-operators.md',
    'assets/posts/course/rxjs-pipe-operators/thumbnail.svg',
    '2022-07-04',
    '/course/rxjs-pipe-operators'
  ),
  new Post(
    'course',
    'Code Quality',
    'Introduction to ESLint',
    'Provides a brief introduction into ESLint.',
    'assets/posts/course/eslint/eslint.md',
    'assets/posts/course/eslint/thumbnail.svg',
    '2023-03-05',
    '/course/eslint'
  ),
  new Post(
    'course',
    'Angular',
    'Angular on GitHub Pages',
    'Gives an introduction to hosting an Angular project on GitHub Pages',
    'assets/posts/course/angular-apps-on-github-pages/angular-apps-on-github-pages.md',
    'assets/posts/course/angular-apps-on-github-pages/thumbnail.svg',
    '2022-07-08',
    '/course/angular-apps-on-github-pages'
  ),
  new Post(
    'course',
    'RxJS',
    'RxJS in Angular',
    'This post covers a short example of using RxJS in an Angular controller.',
    'assets/posts/course/introduction-to-rxjs/introduction-to-rxjs.md',
    'assets/posts/course/introduction-to-rxjs/thumbnail.svg',
    '2022-07-04',
    '/course/introduction-to-rxjs'
  ),
];
