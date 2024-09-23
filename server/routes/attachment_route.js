import { Router } from "express"

import attachmentController from "../controllers/attachment_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const attachmentRouter = Router();

attachmentRouter.get("/:attachment_name", attachmentController.getAttachments);


export default attachmentRouter;