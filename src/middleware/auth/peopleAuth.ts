import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../../config/_logger";
import { sendResponse, STATUS_UNAUTHORIZED } from "../../utilities/response";

const prisma = new PrismaClient();

export const peopleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return sendResponse(res, STATUS_UNAUTHORIZED, {
        message: "Unauthorized access",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (
      !decoded ||
      typeof decoded === "string" ||
      !decoded.id ||
      !decoded.public_key
    ) {
      return sendResponse(res, STATUS_UNAUTHORIZED, {
        message: "Unauthorized access",
      });
    }

    const user = await prisma.people.findUnique({
      where: {
        id: decoded.id,
        public_key: decoded.public_key,
        status: true,
      },
    });

    if (!user) {
      return sendResponse(res, STATUS_UNAUTHORIZED, {
        message: "Unauthorized access",
      });
    }

    res.locals.user = { ...user };
    delete res.locals.user.password;

    next();
  } catch (error) {
    logger.error(error);
    return sendResponse(res, STATUS_UNAUTHORIZED, {
      message: "Unauthorized access",
    });
  }
};
