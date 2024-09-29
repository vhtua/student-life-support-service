import { Router } from "express"
import authController from "../controllers/auth_ctl.js"

import authenticateToken from "../middleware/authenticateToken.js";
import constants from "../config/constants.js";

const authRouter = Router();

authRouter.post("/reset-password", authController.getResetPassword); // /auth/reset-password
        
authRouter.post("/login", authController.authenticateUser)                  // /auth/login
authRouter.post("/logout", authController.logOutUser)                       // /auth/logout
authRouter.post("/refresh-token", authController.refreshToken)              // /auth/refresh-token
authRouter.post("/verify-token", authController.verifyToken)                // /auth/refresh-token
authRouter.post("/verify-refreshToken", authController.verifyRefreshToken)   // /auth/verify-refreshToken

authRouter.patch("/reset-password", authController.resetPassword);


export default authRouter;