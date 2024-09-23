import { Router } from "express"

import ratingController from "../controllers/rating_ctl.js"
import authenticateToken from '../middleware/authenticateToken.js'
import constants from "../config/constants.js";


const ratingRouter = Router();

ratingRouter.get("/:ticket_id", authenticateToken(constants.allRoleName), ratingController.getRating);
ratingRouter.post("/", authenticateToken([constants.studentRoleName]), ratingController.rateTicket);


export default ratingRouter;