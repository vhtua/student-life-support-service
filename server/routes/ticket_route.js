import { Router } from "express"

import ticketController from "../controllers/ticket_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import upload from "../middleware/upload.js";
import constants from "../config/constants.js";


const ticketRouter = Router();

ticketRouter.get("/", authenticateToken([constants.adminRoleName]), ticketController.getTicketsList);
ticketRouter.get("/ticket-type", authenticateToken(constants.allRoleName), ticketController.getTicketTypeList);
ticketRouter.get("/public-ticket", authenticateToken(constants.allRoleName), ticketController.getPublicTicketDetails);
ticketRouter.get("/pending-ticket", authenticateToken([constants.staffRoleName, constants.adminRoleName]), ticketController.getPendingTicketDetails);
ticketRouter.get("/pending-ticket/:ticket_id", authenticateToken([constants.staffRoleName, constants.adminRoleName]), ticketController.getPendingTicketDetailsByTicketId);
ticketRouter.get("/audience-type", authenticateToken(constants.allRoleName), ticketController.getTicketAudienceTypeList);
ticketRouter.get("/:username", authenticateToken([constants.studentRoleName, constants.staffRoleName]), ticketController.getTicketsList);
ticketRouter.get("/:username/:ticket_id", authenticateToken([constants.studentRoleName, constants.staffRoleName]), ticketController.getTicketDetails);

ticketRouter.post("/", authenticateToken([constants.studentRoleName]), upload.array('attachments', 10), ticketController.createTicket);


// ticketRouter.get("/rating/:ticket_id", authenticateToken(constants.allRoleName), ticketController.getRating);
// ticketRouter.post("/rating", authenticateToken([constants.studentRoleName]), ticketController.rateTicket);
// ticketRouter.get("/:username", authenticateToken(constants.allRoleName), userController.getUserByUserName);
// ticketRouter.get("/attachments/:attachment_name", ticketController.getAttachments);



export default ticketRouter;