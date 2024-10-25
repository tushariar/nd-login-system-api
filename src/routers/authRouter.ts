import { Router } from "express";
import controller from "../controllers/auth";
import { peopleAuth } from "../middleware/auth/peopleAuth";

const authRouter = Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "Tahsin"
 *               lastname:
 *                 type: string
 *                 example: "Ahmed"
 *               email:
 *                 type: string
 *                 example: "taahzino@gmail.com"
 *               phone:
 *                 type: string
 *                 example: "8801812345678"
 *               password:
 *                 type: string
 *                 example: "password123"
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - phone
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

authRouter.post("/signup", controller.signup);

/**
 * @swagger
 * /auth/signup/confirm:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Confirm user email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "taahzino@gmail.com"
 *               token:
 *                 type: string
 *                 example: "A1B2C3D4E5"
 *     responses:
 *       200:
 *         description: Your account has been confirmed successfully
 *       400:
 *         description: Invalid email or token
 */

authRouter.post("/signup/confirm", controller.confirm);

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       401:
 *        description: Invalid email or password
 */

authRouter.post("/login", controller.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */

authRouter.post("/logout", peopleAuth, controller.logout);

/**
 * @swagger
 * /auth/reset/request:
 *  post:
 *      tags:
 *       - Auth
 *      summary: Request password reset
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@example.com"
 *      responses:
 *       200:
 *        description: Successful request
 *       400:
 *        description: Invalid email
 */

authRouter.post("/reset/request", controller.reset.request);

/**
 * @swagger
 * /auth/reset/verify:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Verify password reset
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP verified"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "A1B2C3D4E5F6G7H8I9J0"
 *       400:
 *         description: Invalid OTP
 */

authRouter.post("/reset/verify", controller.reset.verify);

/**
 * @swagger
 * /auth/reset/perform:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Perform password reset
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@example.com"
 *               token:
 *                 type: string
 *                 example: "A1B2C3D4E5F6G7H8I9J0"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful request
 *       400:
 *         description: Invalid password
 *       401:
 *         description: Unauthorized
 */

authRouter.post("/reset/perform", controller.reset.perform);

export default authRouter;
