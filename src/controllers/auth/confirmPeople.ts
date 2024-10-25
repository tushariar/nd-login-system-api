import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validateConfirmation from "../../middleware/auth/validateConfirmation";
import {
  sendResponse,
  sendServerError,
  STATUS_OK,
} from "../../utilities/response";

const confirmPeople = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const { user, verification } = res.locals;

    await prisma.people.update({
      where: {
        email: user.email,
      },
      data: {
        status: true,
      },
    });

    await prisma.emailVerification.delete({
      where: {
        id: verification.id,
      },
    });

    sendResponse(res, STATUS_OK, {
      message: "Your account has been confirmed successfully",
    });

    return;
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default [validateConfirmation, confirmPeople];
