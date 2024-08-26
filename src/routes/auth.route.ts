import express from "express"
import validateResource from "../middleware/validateResource";
import { createSessionHandler } from "../controller/auth.controller";
import { CreateSessionSchema } from "../schema/auth.schema";

const router = express.Router();


    router.post("/api/v1/session",validateResource(CreateSessionSchema),createSessionHandler)

export default router;