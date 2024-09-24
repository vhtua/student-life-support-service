import { Router } from "express"

import messageController from "../controllers/message_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const messageRouter = Router();

messageRouter.get("/conversation", authenticateToken([constants.studentRoleName, constants.staffRoleName]), messageController.getConversationId);
messageRouter.get("/:ticket_id", authenticateToken([constants.studentRoleName, constants.staffRoleName]), messageController.getMessages);


export default messageRouter;