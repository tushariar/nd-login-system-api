import { NextFunction, Request, Response, Router } from "express";
import {
  sendResponse,
  sendServerError,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "../utilities/response";
import authRouter from "./authRouter";
import profileRouter from "./profileRouter";

const appRouter = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Root Route: Health Check
appRouter.get("/", (req: Request, res: Response) => {
  sendResponse(res, STATUS_OK, {
    message: "Hello World!",
  });
  return;
});

// Auth Router: Authentication
appRouter.use("/auth", authRouter);

// People Router: User Profile
appRouter.use("/profile", profileRouter);

// Catch 404 and forward to error handler
appRouter.use((req: Request, res: Response) => {
  sendResponse(res, STATUS_NOT_FOUND, {
    message: "404 Not Found",
  });
  return;
});

// Internal Server Error Handler
appRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  sendServerError(res, err);
  return;
});

export default appRouter;
