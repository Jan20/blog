import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './modules/menu/components/menu/menu.component';
import { LandingComponent } from './modules/landing/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        component: LandingComponent,
        path: 'landing',
        loadChildren: () =>
          import('./modules/landing/landing.module').then(
            module => module.LandingModule
          ),
        data: { title: 'Landing' },
      },
      {
        path: 'recommendations',
        loadChildren: () =>
          import('./modules/recommendations/recommendations.module').then(
            module => module.RecommendationsModule
          ),
        data: { title: 'Recommendations' },
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./modules/about/about.module').then(
            module => module.AboutModule
          ),
        data: { title: 'About' },
      },
      {
        path: 'guides',
        loadChildren: () =>
          import('./modules/guides/guides.module').then(
            module => module.GuidesModule
          ),
        data: { title: 'Guides' },
      },
      {
        path: 'angular-course',
        loadChildren: () =>
          import('./modules/angular-course/angular-course.module').then(
            module => module.AngularCourseModule
          ),
        data: { title: 'Angular Course' },
      },
      {
        path: 'efficient-software-engineering',
        loadChildren: () =>
          import('./modules/engineering/engineering.module').then(
            module => module.EngineeringModule
          ),
        data: { title: 'Engineering' },
      },
    ],
  },
  { path: '**', redirectTo: 'landing' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
