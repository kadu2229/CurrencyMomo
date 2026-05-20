import { Router } from "express";
import { create, getAllByUser, update, destroy } from "./goals.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, getAllByUser);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, destroy);

export default router;