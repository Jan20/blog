import { Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      title: 'Landing',
      description:
        "Jan's Engineering Blog offering guides around Docker, Fzf, Angular, and best practices for efficient software engineering.",
    },
  },
  {
    path: '',
    children: [
      {
        component: LandingComponent,
        path: 'landing',
        loadChildren: () =>
          import('./modules/landing/landing.module').then(
            module => module.LandingModule
          ),
        data: {
          title: 'Landing',
          description:
            'Learn everything needed to become an efficient software engineer, Angular, Pyhton, and Docker',
        },
      },
      {
        path: 'recommendations',
        loadChildren: () =>
          import('./modules/recommendations/recommendations.module').then(
            module => module.RecommendationsModule
          ),
        data: {
          title: 'Recommendations',
          description:
            'Find a list of recommended resourced to read helping you to move forword in your software engineering career',
        },
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./modules/about/about.module').then(
            module => module.AboutModule
          ),
        data: {
          title: 'About',
          description: 'Find move information about me, Jan Ladicha',
        },
      },
      {
        path: 'guides',
        loadChildren: () =>
          import('./modules/guides/guides.module').then(
            module => module.GuidesModule
          ),
        data: {
          title: 'Guides',
          description:
            'Learn more about Docker, containerization of applications, Postgres, and more',
        },
      },
      {
        path: 'course',
        loadChildren: () =>
          import('./modules/course/course.module').then(
            module => module.CourseModule
          ),
        data: {
          title: 'Angular Course',
          description:
            'Learn more about Angular, RxJS, npm, eslint, and related technologies',
        },
      },
      {
        path: 'engineering',
        loadChildren: () =>
          import('./modules/engineering/engineering.module').then(
            module => module.EngineeringModule
          ),
        data: {
          title: 'Engineering',
          description:
            'Learn more efficient terminal setup, lessons learned, and techniques for senior software engineers',
        },
      },
    ],
  },
  { path: '**', redirectTo: 'landing' },
];
