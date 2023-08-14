export class MenuItem {
  constructor(
    public readonly name: string,
    public readonly icon: string,
    public readonly link: string,
    public active: boolean = false
  ) { }
}

export const MENU_ITEMS: MenuItem[] = [
  new MenuItem('Home', 'home', '/', false),
  new MenuItem('Guides', 'auto_stories', 'guides', false),
  new MenuItem('Angular Guides', 'school', 'angular-course', false),
  new MenuItem(
    'Efficient Engineering',
    'settings_suggest',
    'efficient-software-engineering',
    false
  ),
  new MenuItem('Recommendations', 'assistant', 'recommendations', false),
  new MenuItem('About Me', 'person_pin', 'about', false),
];

export enum MenuState {
  MOBILE = 'mobile',
  MINIMIZED = 'minimized',
  MAXIMIZED = 'maximized',
}
