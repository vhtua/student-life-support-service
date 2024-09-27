import { Router } from "express"

import logController from "../controllers/logs_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const logsRouter = Router();


logsRouter.get("/", authenticateToken([constants.adminRoleName]), logController.getLogs);


export default logsRouter;