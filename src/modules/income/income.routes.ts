import { Router } from "express";

import { create, getByUser, update, remove } from "./income.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/",authMiddleware, create);
router.get("/", authMiddleware, getByUser);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

export default router;