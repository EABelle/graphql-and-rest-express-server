import {NextFunction, Response, Request} from "express";
import {UserService} from "../service/user.service";
import {User} from "../domain/User";
import {UserPayload, UserResponse} from "../contract";

export class UserController {

    public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userRequest: UserPayload = req.body;
            const user: User = await UserService.createUser(userRequest);
            const userResponse: UserResponse = { id: user._id, name: user.name, avatar: user.avatar }
            res.json(userResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }
}
