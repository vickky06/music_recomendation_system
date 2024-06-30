import { Song } from '../entities/Song';
import { User } from '../entities/User';
import { SongService } from '../services/SongService';
import { UserService } from '../services/UserService';

export class RecommendationEngine {
    constructor(
        private songService: SongService,
        private userService: UserService
    ) {}

    private calculateSimilarityIndex(song1: Song, song2: Song): number {
        const song1Attributes = song1.getAttributes();
        const song2Attributes = song2.getAttributes();
        const sameAttributes : number = song1Attributes.reduce((acc, attr, index) => {
            return attr === song2Attributes[index] ? acc as number + 1 : acc;
        }, 0) as number;
        return sameAttributes / song1Attributes.length;
    }

    async recommendSongs(userName: string): Promise<Song[]> {
        const user = this.userService.getUser(userName);
        if (!user) {
            return [];
        }

        const playlistSongs = user.playlist.getSongs();
        const librarySongs = this.songService.getAllSongs();
        const recommendations: Array<[number, Song]> = [];

        for (const song of librarySongs) {
            if (!user.playlist.hasSong(song)) {
                const maxSI = Math.max(...playlistSongs.map(plSong => this.calculateSimilarityIndex(song, plSong)));
                recommendations.push([maxSI, song]);
            }
        }

        recommendations.sort((a, b) => b[0] - a[0]);
        return recommendations.map(([_, song]) => song);
    }

    async recommendSongsWithFriends(userName: string): Promise<Song[]> {
        const user = this.userService.getUser(userName);
        if (!user) {
            return [];
        }
    
        const recommendations = await this.recommendSongs(userName);
        const friendRecommendations: Array<[number, Song]> = [];
    
        for (const song of recommendations) {
            const fsi = this.calculateFriendSimilarityIndex(user, song);
            friendRecommendations.push([fsi, song]);
        }
    
        friendRecommendations.sort((a, b) => b[0] - a[0]);
        return friendRecommendations.map(([_, song]) => song);
    }

    private calculateFriendSimilarityIndex(user: User, song: Song): number {
        const friends = user.friends;
        if (friends.size === 0) {
            return 0;
        }

        const friendPlaylists = Array.from(friends).map(friendName => {
            const friend = this.userService.getUser(friendName);
            return friend ? friend.playlist.getSongs() : [];
        });
        const songInFriendsPlaylists = friendPlaylists.flatMap(playlist => playlist).filter(songInPlaylist => songInPlaylist === song).length;
        return songInFriendsPlaylists / friends.size;
    }
}
