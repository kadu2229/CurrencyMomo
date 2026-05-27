import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { remove, getByUser, update, create} from './expense.controller';

const router = Router();

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Criar despesa
 *     description: Cria uma nova despesa para o usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Despesa criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */

router.post('/', authMiddleware, create);
router.get('/', authMiddleware, getByUser);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export default router;