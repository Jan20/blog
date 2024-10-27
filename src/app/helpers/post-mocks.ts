import { Post } from '../modules/shared/models/post';

export const GUIDES: Post[] = [
  new Post('guides', 'Python', 'Virtual Envs & Dependencies', 'Gives an introduciton to virtual environments and dependency management in Python.', 'assets/posts/guides/virtual-envs-and-dependencies/virtual-envs-and-dependencies.md', 'assets/posts/guides/virtual-envs-and-dependencies/thumbnail.svg', '2023-02-06','/guides/virtual-envs-and-dependencies'), 
  new Post('guides', 'Docker', 'Containerize Angular Apps', 'This post covers the creation of a container image for a minimal Angular application.', 'assets/posts/guides/containerize-Angular-applications/containerize-Angular-applications.md', 'assets/posts/guides/containerize-Angular-applications/thumbnail.svg', '2022-06-27','/guides/containerize-Angular-applications', 'Docker', 3), 
  new Post('guides', 'Docker', 'Introduction to Docker', 'Provides a high-level introduction to Docker an its terminology.', 'assets/posts/guides/introduction-to-docker/introduction-to-docker.md', 'assets/posts/guides/introduction-to-docker/thumbnail.svg', '2022-06-27','/guides/introduction-to-docker', 'Docker', 1), 
  new Post('guides', 'Docker', 'Multi Container Applications', 'Describes how to build an application based on a minimal Flask backend and Angular frontend', 'assets/posts/guides/multi-container-applications/multi-container-applications.md', 'assets/posts/guides/multi-container-applications/thumbnail.svg', '2022-06-27','/guides/multi-container-applications', 'Docker', 4), 
  new Post('guides', 'Docker', 'Containerizing PostgreSQL', 'Gives step-by-step instructions for containerizing Postgres database.', 'assets/posts/guides/postgres/postgres.md', 'assets/posts/guides/postgres/thumbnail.svg', '2023-03-25','/guides/postgres'), 
  new Post('guides', 'Docker', 'Containerize Flask Apps', 'This post covers the creation of a container image for a minimal Flask application.', 'assets/posts/guides/containerize_flask_applications/containerize-flask-applications.md', 'assets/posts/guides/containerize_flask_applications/thumbnail.svg', '2022-06-27','/guides/containerize_flask_applications', 'Docker', 2), 

];

export const DOCKER_GUIDES: Post[] = [
  new Post('guides', 'Docker', 'Containerize Angular Apps', 'This post covers the creation of a container image for a minimal Angular application.', 'assets/posts/guides/containerize-Angular-applications/containerize-Angular-applications.md', 'assets/posts/guides/containerize-Angular-applications/thumbnail.svg', '2022-06-27','/guides/containerize-Angular-applications', 'Docker', 3), 
  new Post('guides', 'Docker', 'Introduction to Docker', 'Provides a high-level introduction to Docker an its terminology.', 'assets/posts/guides/introduction-to-docker/introduction-to-docker.md', 'assets/posts/guides/introduction-to-docker/thumbnail.svg', '2022-06-27','/guides/introduction-to-docker', 'Docker', 1), 
  new Post('guides', 'Docker', 'Multi Container Applications', 'Describes how to build an application based on a minimal Flask backend and Angular frontend', 'assets/posts/guides/multi-container-applications/multi-container-applications.md', 'assets/posts/guides/multi-container-applications/thumbnail.svg', '2022-06-27','/guides/multi-container-applications', 'Docker', 4), 
  new Post('guides', 'Docker', 'Containerize Flask Apps', 'This post covers the creation of a container image for a minimal Flask application.', 'assets/posts/guides/containerize_flask_applications/containerize-flask-applications.md', 'assets/posts/guides/containerize_flask_applications/thumbnail.svg', '2022-06-27','/guides/containerize_flask_applications', 'Docker', 2), 
];

export const MISCELLANEOUS_GUIDES: Post[] = [
  new Post('guides', 'Docker', 'Containerizing PostgreSQL', 'Gives step-by-step instructions for containerizing Postgres database.', 'assets/posts/guides/postgres/postgres.md', 'assets/posts/guides/postgres/thumbnail.svg', '2023-03-25','/guides/postgres'), 
  new Post('guides', 'Python', 'Virtual Envs & Dependencies', 'Gives an introduciton to virtual environments and dependency management in Python.', 'assets/posts/guides/virtual-envs-and-dependencies/virtual-envs-and-dependencies.md', 'assets/posts/guides/virtual-envs-and-dependencies/thumbnail.svg', '2023-02-06','/guides/virtual-envs-and-dependencies'), 
];

export const COURSE: Post[] = [
  new Post('course', 'Angular', 'Beginners Guide to npm', 'Gives a brief introduction to npm and its most commonly-used command-line commands.', 'assets/posts/course/introduction-to-npm/introduction-to-npm.md', 'assets/posts/course/introduction-to-npm/thumbnail.svg', '2023-04-13','/course/introduction-to-npm'), 
  new Post('course', 'RxJS', 'RxJS Operators', 'RxJS offers a range of operators of which map, filter and tap get presented.', 'assets/posts/course/rxjs-pipe-operators/rxjs-pipe-operators.md', 'assets/posts/course/rxjs-pipe-operators/thumbnail.svg', '2022-07-04','/course/rxjs-pipe-operators'), 
  new Post('course', 'Code Quality', 'Introduction to ESLint', 'Provides a brief introduction into ESLint.', 'assets/posts/course/eslint/eslint.md', 'assets/posts/course/eslint/thumbnail.svg', '2023-03-05','/course/eslint'), 
  new Post('course', 'Angular', 'Angular on GitHub Pages', 'Gives an introduction to hosting an Angular project on GitHub Pages', 'assets/posts/course/angular-apps-on-github-pages/angular-apps-on-github-pages.md', 'assets/posts/course/angular-apps-on-github-pages/thumbnail.svg', '2022-07-08','/course/angular-apps-on-github-pages'), 
  new Post('course', 'RxJS', 'RxJS in Angular', 'This post covers a short example of using RxJS in an Angular controller.', 'assets/posts/course/introduction-to-rxjs/introduction-to-rxjs.md', 'assets/posts/course/introduction-to-rxjs/thumbnail.svg', '2022-07-04','/course/introduction-to-rxjs'), 
];

export const ENGINEERING_POSTS: Post[] = [
  new Post('engineering', 'Focus', 'Embracing the Terminal', 'Post is about outlining how a terminal can be used effectively.', 'assets/posts/engineering/embracing-the-terminal/embracing-the-terminal.md', 'assets/posts/engineering/embracing-the-terminal/thumbnail.svg', '2024-10-13','/engineering/embracing-the-terminal'), 
  new Post('engineering', 'Efficiency', 'Efficient Task Management', 'Describes an effective task management system for getting stuff done.', 'assets/posts/engineering/task-management/task-management.md', 'assets/posts/engineering/task-management/thumbnail.svg', '2023-02-04','/engineering/task-management'), 
  new Post('engineering', 'Focus', 'Staying Focused', 'This post will share five simple strategies to become less distracted and stay focused.', 'assets/posts/engineering/staying-focused/staying-focused.md', 'assets/posts/engineering/staying-focused/thumbnail.svg', '2022-10-11','/engineering/staying-focused'), 
];
