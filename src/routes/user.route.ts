import express from "express"
import validateResource from "../middleware/validateResource";
import { CreateUserSchema, VerifyUserSchema } from "../schema/user.schema";
import { createUserHandler, VerifyUserHandler } from "../controller/user.controller";

const router = express.Router();

router.post("/api/v1/users",validateResource(CreateUserSchema), createUserHandler);
router.post("/api/v1/users/verify/:id/:verificationCode",validateResource(VerifyUserSchema),VerifyUserHandler)

export default router;