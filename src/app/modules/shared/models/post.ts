/**
 * Represents a blog post.
 */
export class Post {
  /**
   * Creates a new Post object.
   *
   * @param category - The category of the blog post.
   * @param topic - The topic of the blog post.
   * @param headline - The headline or title of the blog post.
   * @param summary - A summary or brief description of the post.
   * @param filePath - The link to the full blog post.
   * @param thumbnail - The path to the post's thumbnail image.
   * @param date - The date of the blog post.
   * @param series - The series to which the post belongs.
   * @param seriesSection - The section within a series, if applicable.
   * @param route - The route of a blog post such as /guides/docker-introduction
   */
  constructor(
    public category: string = '',
    public topic: string = '',
    public headline: string = '',
    public summary: string = '',
    public filePath: string = '',
    public thumbnail: string = '',
    public date: string = '',
    public route: string = '',
    public series: string = '',
    public seriesSection: number = 0,
  ) {}
}
