import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { sendEmailVerification } from "../../config/_sendMail";
import validatePeople from "../../middleware/people/validatePeople";
import { generateActionToken } from "../../utilities/auth";
import {
  sendResponse,
  sendServerError,
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
} from "../../utilities/response";

export const createPeople = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const data = res.locals.body;

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const user = await prisma.people.create({
      data: {
        public_key: uuidV4().toUpperCase(),
        ...data,
        ...res.locals.uploads,
      },
    });

    if (!user) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "Failed to create user",
      });
    } else {
      let userObj: {
        [prop: string]: any;
      } = { ...user };
      delete userObj.password;

      const token = generateActionToken();

      await prisma.emailVerification.create({
        data: {
          email: user.email,
          token: token.hash,
        },
      });

      await sendEmailVerification(user.email, token.key);

      sendResponse(res, STATUS_CREATED, {
        message: "User created successfully",
        data: {
          user: userObj,
        },
      });
    }
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default [validatePeople, createPeople];
