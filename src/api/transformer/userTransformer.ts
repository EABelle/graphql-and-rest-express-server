import {UserResponse} from '../contract';
import {User} from '../domain/User';

export function transform(user: User): UserResponse {
    return { id: user._id, name: user.name, avatar: user.avatar };
}

