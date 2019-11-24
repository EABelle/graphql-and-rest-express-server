import {Router} from "express";
import {UserController} from "../controller/user.controller";

export const userRouter: Router = Router()
    .post('/', UserController.createUser);

