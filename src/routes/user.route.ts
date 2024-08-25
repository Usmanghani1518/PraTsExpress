import express, { Request, Response } from "express"
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import { createUserHandler } from "../controller/user.controller";

const router = express.Router();

router.post("/api/v1/users",validateResource(createUserSchema), createUserHandler)

export default router;