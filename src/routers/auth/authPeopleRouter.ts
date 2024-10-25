import { Router } from "express";
import controller from "../../controllers/auth";
import { peopleAuth } from "../../middleware/auth/peopleAuth";

const authPeopleRouter = Router();

/**
 * @swagger
 *
 * /auth/people/login:
 *   post:
 *     tags:
 *      - Auth/People
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

authPeopleRouter.post("/login", controller.login);

/**
 * @swagger
 * /auth/people/logout:
 *   post:
 *     tags:
 *       - Auth/People
 *     summary: Logout user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */

authPeopleRouter.post("/logout", peopleAuth, controller.logout);

/**
 * @swagger
 * /auth/people/reset/request:
 *  post:
 *      tags:
 *       - Auth/People
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

authPeopleRouter.post("/reset/request", controller.reset.request);

/**
 * @swagger
 * /auth/people/reset/verify:
 *   post:
 *     tags:
 *      - Auth/People
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

authPeopleRouter.post("/reset/verify", controller.reset.verify);

/**
 * @swagger
 * /auth/people/reset/perform:
 *   post:
 *     tags:
 *      - Auth/People
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

authPeopleRouter.post("/reset/perform", controller.reset.perform);

export default authPeopleRouter;
