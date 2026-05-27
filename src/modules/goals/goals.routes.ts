import { Router } from "express";
import { create, getAllByUser, update, destroy } from "./goals.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

/** 
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Criar meta
 *     description: Cria uma nova meta para o usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               targetAmount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Meta criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post("/", authMiddleware, create);

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Listar metas
 *     description: Lista todas as metas do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de metas
 *       401:
 *         description: Não autorizado
 */
router.get("/", authMiddleware, getAllByUser);

/**
 * @swagger
 * /api/goals/{id}:
 *   put:
 *     summary: Atualizar meta
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
 *               title:
 *                 type: string
 *               targetAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Meta atualizada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Meta não encontrada
 */
router.put("/:id", authMiddleware, update);

/**
 * @swagger
 * /api/goals/{id}:
 *   delete:
 *     summary: Deletar meta
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
 *         description: Meta deletada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Meta não encontrada
 */
router.delete("/:id", authMiddleware, destroy);

export default router;