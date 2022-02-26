export class Post {

    public fileName: string
    public category: string
    public headline: string
    public firstParagraph: string
    public link: string

    constructor(fileName: string, category: string) {
        this.fileName = fileName
        this.category = category
        this.headline = ''
        this.firstParagraph = ''
        this.link = ''
    }
}
