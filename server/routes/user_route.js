import { Router } from "express"

import userController from "../controllers/user_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'


const userRouter = Router();

userRouter.get("/", authenticateToken, userController.getUsersList)     


export default userRouter;