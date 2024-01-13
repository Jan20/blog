/**
 * Represents a blog post.
 */
export class Post {
  /**
   * Constructor for creating a new instance of the Post class.
   *
   * @param {string} category - The category to which the post belongs.
   * @param {string} topic - The topic or title of the post.
   * @param {string} headline - The headline or main title of the post.
   * @param {string} summary - A brief summary or description of the post content.
   * @param {string} filePath - The file path of the post content.
   * @param {string} thumbnail - The URL or file path of the post thumbnail or image.
   * @param {string} date - The date when the post was created or published.
   * @param {string} route - The route or URL associated with the post.
   * @param {string} series - The series to which the post belongs, if applicable.
   * @param {number} seriesSection - The section number within the series, if applicable.
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
    public seriesSection: number = 0
  ) {}
}
