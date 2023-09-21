export class PageTitle {
  constructor(
    public headline: string,
    public description: string,
    public background: string
  ) {}
}

export enum PageTitleBackground {
  LANDING = 'landing',
  ANGULAR_COURSE = 'angular-course',
  ENGINEERING = 'engineering',
  GUIDES = 'guides',
  CONTACT = 'contact',
  RECOMMENDATIONS = 'recommendations',
  ABOUT = 'about',
}
