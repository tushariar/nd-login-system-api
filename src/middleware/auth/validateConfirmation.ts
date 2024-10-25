import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { emailVerificationSchema } from "../../schema/shortSchemas";
import {
  sendResponse,
  sendServerError,
  sendZodErrors,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
} from "../../utilities/response";

const validateConfirmation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prisma = new PrismaClient();

  try {
    const { error } = emailVerificationSchema.safeParse(req.body);

    if (error) {
      sendZodErrors(res, error.errors);
      return;
    }

    const { email, token } = emailVerificationSchema.parse(req.body);

    const verification = await prisma.emailVerification.findFirst({
      where: {
        email,
      },
    });

    if (!verification) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "Invalid email",
      });
      return;
    }

    if (!(await bcrypt.compare(token, verification.token))) {
      sendResponse(res, STATUS_UNAUTHORIZED, {
        message: "Invalid token",
      });
      return;
    }

    const user = await prisma.people.findUnique({
      where: {
        email,
        status: false,
      },
    });

    if (!user) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "Invalid email or token",
      });
      return;
    }

    res.locals.user = user;
    res.locals.verification = verification;

    next();
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default validateConfirmation;
