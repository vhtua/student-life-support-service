import { Router } from "express"

import ticketController from "../controllers/ticket_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import upload from "../middleware/upload.js";
import constants from "../config/constants.js";


const ticketRouter = Router();

ticketRouter.get("/", authenticateToken([constants.studentRoleName, constants.staffRoleName]), ticketController.getTicketsList);
ticketRouter.get("/types", authenticateToken(constants.allRoleName), ticketController.getTicketTypeList);
ticketRouter.get("/public", authenticateToken(constants.allRoleName), ticketController.getPublicTicketDetails);
ticketRouter.get("/pending", authenticateToken([constants.staffRoleName, constants.adminRoleName]), ticketController.getPendingTicketDetails);
ticketRouter.get("/pending/:ticket_id", authenticateToken([constants.staffRoleName, constants.adminRoleName]), ticketController.getPendingTicketDetailsByTicketId);
ticketRouter.get("/in-progress", authenticateToken([constants.staffRoleName]), ticketController.getInProgressTickets);
ticketRouter.get("/in-progress/:ticket_id", authenticateToken([constants.staffRoleName]), ticketController.getInProgressTicketDetailsByTicketId);
ticketRouter.get("/closed", authenticateToken([constants.staffRoleName]), ticketController.getClosedTickets);
ticketRouter.get("/closed/:ticket_id", authenticateToken([constants.staffRoleName]), ticketController.getClosedTicketDetails);
ticketRouter.get("/audience-type", authenticateToken(constants.allRoleName), ticketController.getTicketAudienceTypeList);
// ticketRouter.get("/:username", authenticateToken([constants.studentRoleName, constants.staffRoleName]), ticketController.getTicketsList);
ticketRouter.get("/:ticket_id", authenticateToken([constants.studentRoleName, constants.staffRoleName]), ticketController.getTicketDetails);

ticketRouter.post("/", authenticateToken([constants.studentRoleName]), upload.array('attachments', 10), ticketController.createTicket);
ticketRouter.post("/in-progress", authenticateToken([constants.staffRoleName]), ticketController.assignStaffToTicket);
ticketRouter.post("/done", authenticateToken([constants.staffRoleName]), ticketController.doneTicket);
ticketRouter.post("/cancel", authenticateToken([constants.staffRoleName]), ticketController.cancelTicket);

ticketRouter.patch("/status", authenticateToken([constants.staffRoleName]), ticketController.updateTicketStatus);



export default ticketRouter;