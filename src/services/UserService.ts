import { User } from '../entities/User';
import { Song } from '../entities/Song';

export class UserService {
    private users: Map<string, User>;

    constructor() {
        this.users = new Map<string, User>();
    }

    addUser(user: User): void {
        this.users.set(user.name, user);
    }

    getUser(name: string): User | undefined {
        return this.users.get(name);
    }

    addFriend(userName: string, friendName: string): void {
        const user = this.getUser(userName);
        const friend = this.getUser(friendName);
        if (user && friend) {
            user.addFriend(friendName);
            friend.addFriend(userName);
        }
    }

    addSongToPlaylist(userName: string, song: Song): void {
        const user = this.getUser(userName);
        if (user) {
            user.addSongToPlaylist(song);
        }
    }
}
