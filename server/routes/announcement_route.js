import { Router } from "express"

import announcementController from "../controllers/announcement_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const announcementRouter = Router();

announcementRouter.get("/", authenticateToken(constants.allRoleName), announcementController.getAnnouncementList);

announcementRouter.post("/", authenticateToken([constants.staffRoleName, constants.adminRoleName]), announcementController.createAnnouncement);


export default announcementRouter;