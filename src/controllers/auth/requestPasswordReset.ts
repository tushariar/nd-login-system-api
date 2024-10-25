import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { sendResetPassOTP } from "../../config/_sendMail";
import validateRequestPasswordReset from "../../middleware/auth/validateRequestPasswordReset";
import { generateOTP } from "../../utilities/auth";
import {
  sendResponse,
  sendServerError,
  STATUS_OK,
} from "../../utilities/response";

const requestPasswordReset = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const { user } = res.locals;

    // delete all verification with the user's email
    await prisma.resetVerification.deleteMany({
      where: {
        email: user.email,
      },
    });

    // generate an OTP
    const otp = generateOTP();

    // store the OTP in the database
    await prisma.resetVerification.create({
      data: {
        email: user.email,
        otp,
      },
    });

    // send email with OTP to the user
    await sendResetPassOTP(user.email, otp);

    sendResponse(res, STATUS_OK, {
      message: "An OTP will be sent to your email if it exists",
    });

    return;
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default [validateRequestPasswordReset, requestPasswordReset];
