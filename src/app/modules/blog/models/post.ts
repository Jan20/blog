export class Post {
  constructor(
    public category: string = '',
    public topic: string = '',
    public headline: string = '',
    public firstParagraph: string = '',
    public link: string = '',
    public thumbnail: string = '',
    public date: string = ''
  ) {}
}
