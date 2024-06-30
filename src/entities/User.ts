import { Playlist } from './Playlist';
import { Song } from './Song';

export class User {
    public playlist: Playlist;
    public friends: Set<string>;

    constructor(public name: string) {
        this.playlist = new Playlist();
        this.friends = new Set<string>();
    }

    addFriend(friendName: string): void {
        this.friends.add(friendName);
    }

    addSongToPlaylist(song: Song): void {
        this.playlist.addSong(song);
    }
}
