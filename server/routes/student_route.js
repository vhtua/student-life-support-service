import { Router } from "express"

import studentController from "../controllers/student_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const studentRouter = Router();

studentRouter.patch("/change-password", authenticateToken([constants.studentRoleName]), studentController.changePassword);



export default studentRouter;