import { Router } from "express"

import dormController from "../controllers/dorm_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const dormRouter = Router();

dormRouter.get("/areas", authenticateToken([constants.adminRoleName]), dormController.getDormArea);
dormRouter.get("/rooms/:area", authenticateToken([constants.adminRoleName]), dormController.getDormRoomByArea);



export default dormRouter;