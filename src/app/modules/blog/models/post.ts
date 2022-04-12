export class Post {
    constructor(
        public category: string = '',
        public fileName: string = '',
        public headline: string = '',
        public firstParagraph: string = '',
        public link: string = '',
        public imageUrl: string = ''
    ) { }
}
