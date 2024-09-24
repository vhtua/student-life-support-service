import { Router } from "express"

import notificationController from "../controllers/notification_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const notificationRouter = Router();

notificationRouter.get("/", authenticateToken(constants.allRoleName), notificationController.getNotificationsList);


export default notificationRouter;