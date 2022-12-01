export class Post {
  constructor(
    public category: string = '',
    public topic: string = '',
    public headline: string = '',
    public summary: string = '',
    public link: string = '',
    public thumbnail: string = '',
    public date: string = '',
    public series: string = '',
    public seriesSection: number = 0
  ) {}
}
