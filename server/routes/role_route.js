import { Router } from "express"

import roleController from "../controllers/role_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const roleRouter = Router();

roleRouter.get("/", authenticateToken([constants.staffRoleName, constants.adminRoleName]), roleController.getRoles);



export default roleRouter;