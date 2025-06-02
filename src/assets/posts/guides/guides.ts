import { Post } from '../../../app/modules/shared/models/post';

export const guides: Post[] = [
  new Post(
    'guides',
    'Python',
    'Virtual Envs & Dependencies',
    'Gives an introduciton to virtual environments and dependency management in Python.',
    'assets/posts/guides/virtual-envs-and-dependencies/virtual-envs-and-dependencies.md',
    'assets/posts/guides/virtual-envs-and-dependencies/thumbnail.svg',
    '2023-02-06',
    '/guides/virtual-envs-and-dependencies'
  ),
  new Post(
    'guides',
    'Docker',
    'Containerize Angular Apps',
    'This post covers the creation of a container image for a minimal Angular application.',
    'assets/posts/guides/containerize-Angular-applications/containerize-Angular-applications.md',
    'assets/posts/guides/containerize-Angular-applications/thumbnail.svg',
    '2022-06-27',
    '/guides/containerize-Angular-applications',
    'Docker',
    3
  ),
  new Post(
    'guides',
    'Docker',
    'Introduction to Docker',
    'Provides a high-level introduction to Docker an its terminology.',
    'assets/posts/guides/introduction-to-docker/introduction-to-docker.md',
    'assets/posts/guides/introduction-to-docker/thumbnail.svg',
    '2022-06-27',
    '/guides/introduction-to-docker',
    'Docker',
    1
  ),
  new Post(
    'guides',
    'Docker',
    'Multi Container Applications',
    'Describes how to build an application based on a minimal Flask backend and Angular frontend',
    'assets/posts/guides/multi-container-applications/multi-container-applications.md',
    'assets/posts/guides/multi-container-applications/thumbnail.svg',
    '2022-06-27',
    '/guides/multi-container-applications',
    'Docker',
    4
  ),
  new Post(
    'guides',
    'Docker',
    'Containerizing PostgreSQL',
    'Gives step-by-step instructions for containerizing Postgres database.',
    'assets/posts/guides/postgres/postgres.md',
    'assets/posts/guides/postgres/thumbnail.svg',
    '2023-03-25',
    '/guides/postgres'
  ),
  new Post(
    'guides',
    'Docker',
    'Containerize Flask Apps',
    'This post covers the creation of a container image for a minimal Flask application.',
    'assets/posts/guides/containerize_flask_applications/containerize-flask-applications.md',
    'assets/posts/guides/containerize_flask_applications/thumbnail.svg',
    '2022-06-27',
    '/guides/containerize_flask_applications',
    'Docker',
    2
  ),
];
