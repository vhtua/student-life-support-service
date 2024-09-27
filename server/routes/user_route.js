import { Router } from "express"

import userController from "../controllers/user_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const userRouter = Router();

userRouter.get("/", authenticateToken(constants.allRoleName), userController.getUserByUserName);
userRouter.get("/all", authenticateToken([constants.adminRoleName]), userController.getUsersList);

userRouter.patch("/password", authenticateToken(constants.allRoleName), userController.changePassword);
userRouter.patch("/phone-number", authenticateToken(constants.allRoleName), userController.editPhoneNumber);
userRouter.patch("/dorm/:user_id", authenticateToken([constants.adminRoleName]), userController.editDorm);
userRouter.patch("/role/:user_id", authenticateToken([constants.adminRoleName]), userController.editRole);



export default userRouter;