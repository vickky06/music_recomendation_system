import { Song } from './Song';

export class Playlist {
    private songs: Map<string, Song>;

    constructor() {
        this.songs = new Map<string, Song>();
    }

    addSong(song: Song): void {
        this.songs.set(song.name, song);
    }

    getSongs(): Song[] {
        return Array.from(this.songs.values());
    }

    hasSong(song: Song): boolean {
        return this.songs.has(song.name);
    }
}
