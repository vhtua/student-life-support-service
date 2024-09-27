import { Router } from "express"

import reportController from "../controllers/report_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const reportRouter = Router();


reportRouter.get("/tickets", authenticateToken([constants.adminRoleName]), reportController.getTicketsReport);


export default reportRouter;