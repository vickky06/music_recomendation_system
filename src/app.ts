import { SongService } from './services/SongService';
import { UserService } from './services/UserService';
import { RecommendationEngine } from './recommendation/RecomendationEngine';
import { MusicRecommendationController } from './controllers/MusicRecomendationController';

const songService = new SongService();
const userService = new UserService();
const recommendationEngine = new RecommendationEngine(songService, userService);
const controller = new MusicRecommendationController(songService, userService, recommendationEngine);

// Add songs to library
controller.addSong("Song1", "Pop", "Fast", "Singer1", 90, 2020);
controller.addSong("Song2", "Rock", "Slow", "Singer2", 80, 2019);
controller.addSong("Song3", "Pop", "Fast", "Singer3", 70, 2018);
controller.addSong("Song4", "Jazz", "Medium", "Singer1", 85, 2021);

// Add users and their playlists
controller.addUser("User1");
controller.addUser("User2");
controller.addSongToPlaylist("User1", "Song1");
controller.addSongToPlaylist("User1", "Song2");
controller.addSongToPlaylist("User2", "Song3");

// Add friends
controller.addFriend("User1", "User2");

// Get recommendations
console.log("Recommendations for User1:");
controller.getRecommendations("User1").then(recommendations => {
    recommendations.forEach(song => console.log(song.name));
});

// Get recommendations with friends' playlists considered
console.log("Recommendations with friends for User1:");
controller.getRecommendationsWithFriends("User1").then(recommendations => {
    recommendations.forEach(song => console.log(song.name));
});
