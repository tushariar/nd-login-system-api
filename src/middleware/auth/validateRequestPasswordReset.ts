import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { emailSchema } from "../../schema/shortSchemas";
import {
  sendResponse,
  sendServerError,
  sendZodErrors,
  STATUS_OK,
} from "../../utilities/response";

const validateRequestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prisma = new PrismaClient();

  try {
    const { error } = emailSchema.safeParse(req.body);

    if (error) {
      sendZodErrors(res, error.errors);
      return;
    }

    const { email } = emailSchema.parse(req.body);

    const user = await prisma.people.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      sendResponse(res, STATUS_OK, {
        message: "An OTP will be sent to your email if it exists",
      });
      return;
    }

    res.locals.user = user;

    next();
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default validateRequestPasswordReset;
