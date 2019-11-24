import {UserModel} from '../model';
import {User} from "../domain/User";
import {UserPayload} from "../contract";

export default class UserRepository {
    static async create(userPayload: UserPayload): Promise<User> {
        const userModel = new UserModel(userPayload);
        const user: User = await userModel.save();
        return user;
    }
}
