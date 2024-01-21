import { Post } from '../modules/shared/models/post';

export const GUIDES: Post[] = [
  new Post(
    '010_postgres',
    'Docker',
    'Containerizing PostgreSQL',
    'Gives step-by-step instructions for containerizing Postgres database.',
    '/guides/010_postgres/010_postgres.md',
    'assets/posts/guides/010_postgres/thumbnail.svg',
    '2023-03-25',
    '/Users/jan/Developer/blog/src/assets/posts/guides/010_postgres/010_postgres.md'
  ),
  new Post(
    '005_containerize_flask_applications',
    'Docker',
    'Containerize Flask Apps',
    'This post covers the creation of a container image for a minimal Flask application.',
    '/guides/005_containerize_flask_applications/005_containerize_flask_applications.md',
    'assets/posts/guides/005_containerize_flask_applications/thumbnail.svg',
    '2022-06-27',
    '/Users/jan/Developer/blog/src/assets/posts/guides/005_containerize_flask_applications/005_containerize_flask_applications.md',
    'Docker',
    2
  ),
  new Post(
    '006_containerize_Angular_applications',
    'Docker',
    'Containerize Angular Apps',
    'This post covers the creation of a container image for a minimal Angular application.',
    '/guides/006_containerize_Angular_applications/006_containerize_Angular_applications.md',
    'assets/posts/guides/006_containerize_Angular_applications/thumbnail.svg',
    '2022-06-27',
    '/Users/jan/Developer/blog/src/assets/posts/guides/006_containerize_Angular_applications/006_containerize_Angular_applications.md',
    'Docker',
    3
  ),
  new Post(
    '004_introduction_to_docker',
    'Docker',
    'Introduction to Docker',
    'Provides a high-level introduction to Docker an its terminology.',
    '/guides/004_introduction_to_docker/004_introduction_to_docker.md',
    'assets/posts/guides/004_introduction_to_docker/thumbnail.svg',
    '2022-06-27',
    '/Users/jan/Developer/blog/src/assets/posts/guides/004_introduction_to_docker/004_introduction_to_docker.md',
    'Docker',
    1
  ),
  new Post(
    '008_virtual_envs_and_dependencies',
    'Python',
    'Virtual Envs & Dependencies',
    'Gives an introduciton to virtual environments and dependency management in Python.',
    '/guides/008_virtual_envs_and_dependencies/008_virtual_envs_and_dependencies.md',
    'assets/posts/guides/008_virtual_envs_and_dependencies/thumbnail.svg',
    '2023-02-06',
    '/Users/jan/Developer/blog/src/assets/posts/guides/008_virtual_envs_and_dependencies/008_virtual_envs_and_dependencies.md'
  ),
  new Post(
    '007_multi_container_applications',
    'Docker',
    'Multi Container Applications',
    'Describes how to build an application based on a minimal Flask backend and Angular frontend',
    '/guides/007_multi_container_applications/007_multi_container_applications.md',
    'assets/posts/guides/007_multi_container_applications/thumbnail.svg',
    '2022-06-27',
    '/Users/jan/Developer/blog/src/assets/posts/guides/007_multi_container_applications/007_multi_container_applications.md',
    'Docker',
    4
  ),
];

export const COURSE: Post[] = [
  new Post(
    '002-introduction-to-rxjs',
    'RxJS',
    'RxJS in Angular',
    'This post covers a short example of using RxJS in an Angular controller.',
    '/course/002-introduction-to-rxjs/002-introduction-to-rxjs.md',
    'assets/posts/course/002-introduction-to-rxjs/thumbnail.svg',
    '2022-07-04',
    '/Users/jan/Developer/blog/src/assets/posts/course/002-introduction-to-rxjs/002-introduction-to-rxjs.md'
  ),
  new Post(
    '111-introduction-to-npm',
    'Angular',
    'Beginners Guide to npm',
    'Gives a brief introduction to npm and its most commonly-used command-line commands.',
    '/course/111-introduction-to-npm/111-introduction-to-npm.md',
    'assets/posts/course/111-introduction-to-npm/thumbnail.svg',
    '2023-04-13',
    '/Users/jan/Developer/blog/src/assets/posts/course/111-introduction-to-npm/111-introduction-to-npm.md'
  ),
  new Post(
    '109-eslint',
    'Code Quality',
    'Introduction to ESLint',
    'Provides a brief introduction into ESLint.',
    '/course/109-eslint/109-eslint.md',
    'assets/posts/course/109-eslint/thumbnail.svg',
    '2023-03-05',
    '/Users/jan/Developer/blog/src/assets/posts/course/109-eslint/109-eslint.md'
  ),
  new Post(
    '003-rxjs-pipe-operators',
    'RxJS',
    'RxJS Operators',
    'RxJS offers a range of operators of which map, filter and tap get presented.',
    '/course/003-rxjs-pipe-operators/003-rxjs-pipe-operators.md',
    'assets/posts/course/003-rxjs-pipe-operators/thumbnail.svg',
    '2022-07-04',
    '/Users/jan/Developer/blog/src/assets/posts/course/003-rxjs-pipe-operators/003-rxjs-pipe-operators.md'
  ),
  new Post(
    '101-angular-apps-on-github-pages',
    'Angular',
    'Angular on GitHub Pages',
    'Gives an introduction to hosting an Angular project on GitHub Pages',
    '/course/101-angular-apps-on-github-pages/101-angular-apps-on-github-pages.md',
    'assets/posts/course/101-angular-apps-on-github-pages/thumbnail.svg',
    '2022-07-08',
    '/Users/jan/Developer/blog/src/assets/posts/course/101-angular-apps-on-github-pages/101-angular-apps-on-github-pages.md'
  ),
];

export const RXJS_RELATED_POSTS: Post[] = [
  new Post(
    'course',
    'RxJS',
    'RxJS in Angular',
    'This post covers a short example of using RxJS in an Angular controller.',
    'assets/posts/course/002-introduction-to-rxjs/002-introduction-to-rxjs.md',
    'assets/posts/course/002-introduction-to-rxjs/thumbnail.svg',
    '2022-07-04',
    '/course/introduction-to-rxjs'
  ),
  new Post(
    'course',
    'RxJS',
    'RxJS Operators',
    'RxJS offers a range of operators of which map, filter and tap get presented.',
    'assets/posts/course/003-rxjs-pipe-operators/003-rxjs-pipe-operators.md',
    'assets/posts/course/003-rxjs-pipe-operators/thumbnail.svg',
    '2022-07-04',
    '/course/rxjs-pipe-operators'
  ),
];

export const ENGINEERING_POSTS: Post[] = [
  new Post(
    'engineering',
    'Efficiency',
    'Efficient Task Management',
    'Describes an effective task management system for getting stuff done.',
    'assets/posts/engineering/205-task-management/205-task-management.md',
    'assets/posts/engineering/205-task-management/thumbnail.svg',
    '2023-02-04',
    '/engineering/task-management'
  ),
  new Post(
    'engineering',
    'Focus',
    'Staying Focused',
    'This post will share five simple strategies to become less distracted and stay focused.',
    'assets/posts/engineering/204-staying-focus/204-staying-focused.md',
    'assets/posts/engineering/204-staying-focus/thumbnail.svg',
    '2022-10-11',
    '/engineering/staying-focus'
  ),
];
