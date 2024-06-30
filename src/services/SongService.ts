import { Song } from '../entities/Song';

export class SongService {
    private songs: Map<string, Song>;

    constructor() {
        this.songs = new Map<string, Song>();
    }

    addSong(song: Song): void {
        this.songs.set(song.name, song);
    }

    getSong(name: string): Song | undefined {
        return this.songs.get(name);
    }

    getAllSongs(): Song[] {
        return Array.from(this.songs.values());
    }
}
