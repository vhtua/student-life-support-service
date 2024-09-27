import { Router } from "express"

import dormController from "../controllers/dorm_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const dormRouter = Router();

dormRouter.get("/", authenticateToken([constants.adminRoleName]), dormController.getAllDorms);
dormRouter.get("/areas", authenticateToken([constants.adminRoleName]), dormController.getDormArea);
dormRouter.get("/rooms/:area", authenticateToken([constants.adminRoleName]), dormController.getDormRoomByArea);

dormRouter.post("/", authenticateToken([constants.adminRoleName]), dormController.createDorm);

dormRouter.delete("/:area/:room", authenticateToken([constants.adminRoleName]), dormController.deleteDorm);

export default dormRouter;