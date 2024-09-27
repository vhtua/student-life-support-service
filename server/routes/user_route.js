import { Router } from "express"

import userController from "../controllers/user_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const userRouter = Router();

userRouter.get("/", authenticateToken(constants.allRoleName), userController.getUserByUserName);
userRouter.get("/all", authenticateToken([constants.adminRoleName]), userController.getUsersList);

userRouter.post("/", authenticateToken([constants.adminRoleName]), userController.createUser);

userRouter.patch("/password", authenticateToken(constants.allRoleName), userController.changePassword);
userRouter.patch("/phone-number", authenticateToken(constants.allRoleName), userController.editPhoneNumber);
userRouter.patch("/dorm/:user_id", authenticateToken([constants.adminRoleName]), userController.editDorm);
userRouter.patch("/role/:user_id", authenticateToken([constants.adminRoleName]), userController.editRole);
userRouter.patch("/:user_id", authenticateToken([constants.adminRoleName]), userController.editUser);

userRouter.delete("/:user_id", authenticateToken([constants.adminRoleName]), userController.deleteUser);



export default userRouter;