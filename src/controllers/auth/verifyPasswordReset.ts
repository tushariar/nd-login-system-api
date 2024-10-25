import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validateVerifyResetRequest from "../../middleware/auth/validateVerifyResetRequest";
import { generateActionToken } from "../../utilities/auth";
import {
  sendResponse,
  sendServerError,
  STATUS_OK,
} from "../../utilities/response";

const verifyPasswordReset = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const { verification } = res.locals;

    const token = generateActionToken();

    // update the email verification record
    await prisma.resetVerification.update({
      where: {
        id: verification.id,
      },
      data: {
        token: token.hash,
      },
    });

    // send the OTP to the user
    sendResponse(res, STATUS_OK, {
      message: "OTP verified successfully",
      data: {
        token: token.key,
      },
    });

    return;
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default [validateVerifyResetRequest, verifyPasswordReset];
