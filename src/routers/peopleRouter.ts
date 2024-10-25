import { Router } from "express";
import createPeople from "../controllers/people/createPeople";

const peopleRouter = Router();

/**
 * @swagger
 * /people:
 *   post:
 *     tags:
 *       - People
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
 *                 example: "01812345678"
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

peopleRouter.post("/", createPeople);

export default peopleRouter;
