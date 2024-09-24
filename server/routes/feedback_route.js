import { Router } from "express"

import feedbackController from "../controllers/feedback_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const feedbackRouter = Router();


feedbackRouter.post("/", authenticateToken([constants.studentRoleName, constants.staffRoleName]), feedbackController.sendFeedback);


export default feedbackRouter;