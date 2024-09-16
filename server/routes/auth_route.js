import { Router } from "express"
import authController from "../controllers/auth_ctl.js"

const authRouter = Router();

authRouter.post("/login", authController.authenticateUser)      // /auth/login
authRouter.post("/logout", authController.logOutUser)           // /auth/logout
authRouter.post("/refresh-token", authController.refreshToken)  // /auth/refresh-token
authRouter.post("/verify-token", authController.verifyToken)   // /auth/refresh-token


export default authRouter;