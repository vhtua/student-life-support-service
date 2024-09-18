import { Router } from "express"

import userController from "../controllers/user_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const userRouter = Router();

userRouter.get("/", authenticateToken([constants.adminRoleName]), userController.getUsersList)     


export default userRouter;