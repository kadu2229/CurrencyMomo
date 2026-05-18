import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { remove, getByUser, update, create} from './expense.controller';

const router = Router();

router.post('/', authMiddleware, create);
router.get('/', authMiddleware, getByUser);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export default router;