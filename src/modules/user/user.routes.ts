import { Router } from "express";
import { authLimiter } from "../../config/rateLimiter";
import { register, login } from "./user.controller";

const router = Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Cadastrar usuário
 *     description: Cria uma nova conta de usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou usuário já existe
 */
router.post('/register', register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login
 *     description: Autentica o usuário e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem sucedido, retorna token JWT
 *       401:
 *         description: Credenciais inválidas
 *       429:
 *         description: Muitas tentativas, tente novamente em 15 minutos
 */
router.post('/login', authLimiter, login);

export default router;