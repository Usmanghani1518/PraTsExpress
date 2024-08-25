import express from "express"
import { values } from "lodash";
import validateResource from "../middleware/validateResource";
import { CreateUserSchema } from "../schema/user.schema";
import { createSessionHandler } from "../controller/auth.controller";
import { CreateSessionSchema } from "../schema/auth.schema";

const router = express.Router();


    router.post("/api/v1/session",validateResource(CreateSessionSchema),createSessionHandler)

export default router;