import { Router } from "express"

import ticketController from "../controllers/ticket_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const ticketRouter = Router();

ticketRouter.get("/", authenticateToken([constants.adminRoleName]), ticketController.getTicketsList);
ticketRouter.get("/:username", authenticateToken([constants.studentRoleName, constants.staffRoleName]), ticketController.getTicketsList);
ticketRouter.get("/:username/:ticket_id", authenticateToken([constants.studentRoleName, constants.staffRoleName]), ticketController.getTicketDetails);
// ticketRouter.get("/:username", authenticateToken(constants.allRoleName), userController.getUserByUserName);



export default ticketRouter;