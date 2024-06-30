import { SongService } from '../services/SongService';
import { UserService } from '../services/UserService';
import  {RecommendationEngine}  from '../recommendation/RecomendationEngine';
import { Song } from '../entities/Song';
import { User } from '../entities/User';

export class MusicRecommendationController {
    constructor(
        private songService: SongService,
        private userService: UserService,
        private recommendationEngine: RecommendationEngine
    ) {}

    addSong(name: string, genre: string, tempo: string, singer: string, popularityScore: number, releaseYear: number): void {
        const song = new Song(name, genre, tempo, singer, popularityScore, releaseYear);
        this.songService.addSong(song);
    }

    addUser(name: string): void {
        const user = new User(name);
        this.userService.addUser(user);
    }

    addFriend(userName: string, friendName: string): void {
        this.userService.addFriend(userName, friendName);
    }

    addSongToPlaylist(userName: string, songName: string): void {
        const song = this.songService.getSong(songName);
        if (song) {
            this.userService.addSongToPlaylist(userName, song);
        }
    }

    async getRecommendations(userName: string): Promise<Song[]> {
        return this.recommendationEngine.recommendSongs(userName);
    }

    async getRecommendationsWithFriends(userName: string): Promise<Song[]> {
        return this.recommendationEngine.recommendSongsWithFriends(userName);
    }
}
