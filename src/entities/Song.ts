export class Song {
    constructor(
        public name: string,
        public genre: string,
        public tempo: string,
        public singer: string,
        public popularityScore: number,
        public releaseYear: number
    ) {}

    getAttributes(): Array<string | number> {
        return [this.genre, this.tempo, this.singer, this.popularityScore, this.releaseYear];
    }
}
