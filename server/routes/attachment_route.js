import { Router } from "express"

import attachmentController from "../controllers/ticket_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const attachmentRouter = Router();

attachmentRouter.get("/", authenticateToken(constants.allRoleName), ticketController.getTicketsList);


export default attachmentRouter;