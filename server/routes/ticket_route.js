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
ticketRouter.get("/staff/in-progress/", authenticateToken([constants.staffRoleName, constants.adminRoleName]), ticketController.getInProgressTickets);
// ticketRouter.get("/staff/in-progress/:ticket_id", authenticateToken([constants.staffRoleName, constants.adminRoleName]), ticketController.getInProgressTicketDetailsByTicketId);
ticketRouter.get("/audience-type", authenticateToken(constants.allRoleName), ticketController.getTicketAudienceTypeList);
// ticketRouter.get("/:username", authenticateToken([constants.studentRoleName, constants.staffRoleName]), ticketController.getTicketsList);
ticketRouter.get("/:ticket_id", authenticateToken([constants.studentRoleName, constants.staffRoleName]), ticketController.getTicketDetails);

ticketRouter.post("/", authenticateToken([constants.studentRoleName]), upload.array('attachments', 10), ticketController.createTicket);
ticketRouter.post("/staff", authenticateToken([constants.staffRoleName]), ticketController.assignStaffToTicket);

ticketRouter.patch("/status", authenticateToken([constants.staffRoleName]), ticketController.updateTicketStatus);



export default ticketRouter;