import { Post } from 'src/app/modules/blog/models/post';

export const guides: Post[] = [
  new Post(
    'guides',
    'Docker',
    'Containerize Flask Apps',
    'This post covers the creation of a container image for a minimal Flask application.',
    '/assets/posts/guides/005_containerize_flask_applications/005_containerize_flask_applications.md',
    'assets/posts/guides/005_containerize_flask_applications/thumbnail.png',
    '2022-06-27',
    'Docker',
    2
  ),
  new Post(
    'guides',
    'RxJS',
    'RxJS in Angular',
    'This post covers a short example of using RxJS in an Angular controller.',
    '/assets/posts/guides/002_introduction_to_rxjs/002_introduction_to_rxjs.md',
    'assets/posts/guides/002_introduction_to_rxjs/thumbnail.png',
    '2022-07-04'
  ),
  new Post(
    'guides',
    'Angular',
    'Angular on GitHub Pages',
    'Gives an introduction to hosting an Angular project on GitHub Pages',
    '/assets/posts/guides/001_angular_apps_on_github_pages/001_angular_apps_on_github_pages.md',
    'assets/posts/guides/001_angular_apps_on_github_pages/thumbnail.png',
    '2022-07-08',
    'Angular Indepth',
    1
  ),
  new Post(
    'guides',
    'Docker',
    'Containerize Angular Apps',
    'This post covers the creation of a container image for a minimal Angular application.',
    '/assets/posts/guides/006_containerize_Angular_applications/006_containerize_Angular_applications.md',
    'assets/posts/guides/006_containerize_Angular_applications/thumbnail.png',
    '2022-06-27',
    'Docker',
    3
  ),
  new Post(
    'guides',
    'Docker',
    'Introduction to Docker',
    'Provides a high-level introduction to Docker an its terminology.',
    '/assets/posts/guides/004_introduction_to_docker/004_introduction_to_docker.md',
    'assets/posts/guides/004_introduction_to_docker/thumbnail.png',
    '2022-06-27',
    'Docker',
    1
  ),
  new Post(
    'guides',
    'RxJS',
    'RxJS Operators',
    'RxJS offers a range of operators of which map, filter and tap get presented.',
    '/assets/posts/guides/003_rxjs_pipe_operators/003_rxjs_pipe_operators.md',
    'assets/posts/guides/003_rxjs_pipe_operators/thumbnail.png',
    '2022-07-04'
  ),
  new Post(
    'guides',
    'Python',
    'Virtual Envs & Dependencies',
    'Gives an introduciton to virtual environments and dependency management in Python.',
    '/assets/posts/guides/008_virtual_envs_and_dependencies/008_virtual_envs_and_dependencies.md',
    'assets/posts/guides/008_virtual_envs_and_dependencies/thumbnail.png',
    '2023-02-06'
  ),
  new Post(
    'guides',
    'Docker',
    'Multi Container Applications',
    'Describes how to build an application based on a minimal Flask backend and Angular frontend',
    '/assets/posts/guides/007_multi_container_applications/007_multi_container_applications.md',
    'assets/posts/guides/007_multi_container_applications/thumbnail.png',
    '2022-06-27',
    'Docker',
    4
  ),
];
