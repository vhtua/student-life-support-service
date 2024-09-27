import { Router } from "express"

import logController from "../controllers/logs_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const logsRouter = Router();


logsRouter.get("/", authenticateToken([constants.adminRoleName]), logController.getLogs);

logsRouter.delete("/", authenticateToken([constants.adminRoleName]), logController.deleteLogs);
logsRouter.delete("/:log_id", authenticateToken([constants.adminRoleName]), logController.deleteSpecificLog);


export default logsRouter;