import { Router } from "express";
import { create, getByUser, update, remove } from "./income.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /api/incomes:
 *   post:
 *     summary: Criar renda
 *     description: Cria uma nova renda para o usuário autenticado
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
 *     responses:
 *       201:
 *         description: Renda criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post("/", authMiddleware, create);

/**
 * @swagger
 * /api/incomes:
 *   get:
 *     summary: Listar rendas
 *     description: Lista todas as rendas do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rendas
 *       401:
 *         description: Não autorizado
 */
router.get("/", authMiddleware, getByUser);

/**
 * @swagger
 * /api/incomes/{id}:
 *   put:
 *     summary: Atualizar renda
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Renda atualizada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Renda não encontrada
 */
router.put("/:id", authMiddleware, update);

/**
 * @swagger
 * /api/incomes/{id}:
 *   delete:
 *     summary: Deletar renda
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Renda deletada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Renda não encontrada
 */
router.delete("/:id", authMiddleware, remove);

export default router;