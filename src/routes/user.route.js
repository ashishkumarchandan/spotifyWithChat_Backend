import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getAllUsers, getMessages } from "../controller/user.controller";

const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/message/:userId", protectRoute, getMessages);

export default router;
