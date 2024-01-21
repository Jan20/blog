import { Post } from 'src/app/modules/shared/models/post';

export const engineering: Post[] = [
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
