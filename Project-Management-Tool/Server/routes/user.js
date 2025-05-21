import express from "express";
import { getRegisteredUsers } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.get('/all-users', getRegisteredUsers);
export default userRouter;