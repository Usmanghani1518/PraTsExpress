import express from "express"
import validateResource from "../middleware/validateResource";
import { CreateUserSchema, ForgotPasswordSchema, ResetPasswordSchema, VerifyUserSchema } from "../schema/user.schema";
import { createUserHandler, forgotPassowrdHandler, resetPasswordHandler, VerifyUserHandler } from "../controller/user.controller";

const router = express.Router();

router.post("/api/v1/users",validateResource(CreateUserSchema), createUserHandler);
router.post("/api/v1/users/verify/:id/:verificationCode",validateResource(VerifyUserSchema),VerifyUserHandler)
router.post("/api/v1/users/forgotPassword",validateResource(ForgotPasswordSchema),forgotPassowrdHandler)
router.post("/api/v1/users/resetPassword/:id/:passwordResetCode",validateResource(ResetPasswordSchema),resetPasswordHandler)

export default router;