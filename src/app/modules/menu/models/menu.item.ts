export class MenuItem {
  constructor(
    public readonly name: string,
    public readonly icon: string,
    public readonly link: string,
    public active: boolean = false
  ) {}
}
