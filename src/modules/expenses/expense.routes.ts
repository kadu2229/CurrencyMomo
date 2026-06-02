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

/** 
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Listar despesas
 *     description: Lista todas as despesas do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de despesas
 *       401:
 *         description: Não autorizado
*/
router.get('/', authMiddleware, getByUser);

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Atualizar despesa
 *     description: Atualiza uma despesa específica do usuário autenticado
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
 *       200:
 *         description: Despesa atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', authMiddleware, update);

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Excluir despesa
 *     description: Exclui uma despesa específica do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Despesa excluída com sucesso
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', authMiddleware, remove);

export default router;