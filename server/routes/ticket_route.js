import { Router } from "express"

import userController from "../controllers/user_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const ticketRouter = Router();

ticketRouter.get("/", authenticateToken([constants.adminRoleName]), userController.getUsersList);
ticketRouter.get("/:username", authenticateToken(constants.allRoleName), userController.getUserByUserName);
ticketRouter.patch("/change-password", authenticateToken(constants.allRoleName), userController.changePassword);



export default ticketRouter;