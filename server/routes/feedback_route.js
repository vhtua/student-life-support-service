import { Router } from "express"

import feedbackController from "../controllers/feedback_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const feedbackRouter = Router();


feedbackRouter.get("/", authenticateToken([constants.adminRoleName]), feedbackController.getFeedbacks);
feedbackRouter.get("/:feedback_id", authenticateToken([constants.adminRoleName]), feedbackController.getFeedbackById);

feedbackRouter.post("/", authenticateToken([constants.studentRoleName, constants.staffRoleName]), feedbackController.sendFeedback);

feedbackRouter.delete("/:feedback_id", authenticateToken([constants.adminRoleName]), feedbackController.deleteFeedback);

export default feedbackRouter;