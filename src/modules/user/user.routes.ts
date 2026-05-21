import { Router } from "express";
import { authLimiter } from "../../config/rateLimiter";
import { register, login } from "./user.controller";

const router = Router();

router.post('/register', register);
router.post('/login', authLimiter, login);

export default router;