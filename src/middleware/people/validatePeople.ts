import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { peopleSchema } from "../../schema/peopleSchema";
import {
  formatZodErrors,
  sendResponse,
  sendServerError,
  STATUS_BAD_REQUEST,
} from "../../utilities/response";

const validatePeople = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = peopleSchema.safeParse(req.body);

    if (error) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "You have some errors in your request",
        errors: formatZodErrors(error.errors),
      });
      return;
    }

    res.locals.body = peopleSchema.parse(req.body);

    const prisma = new PrismaClient();

    const { email, phone } = res.locals.body;

    const user = await prisma.people.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (user) {
      if (user.email === res.locals.body.email) {
        sendResponse(res, STATUS_BAD_REQUEST, {
          message: "Email already exists",
          errors: [
            {
              field: "email",
              message: "Email already exists",
            }
          ],
        });
      } else {
        sendResponse(res, STATUS_BAD_REQUEST, {
          message: "Phone number already exists",
          errors: [
            {
              field: "phone",
              message: "Phone number already exists",
            }
          ],
        });
      }

      await prisma.$disconnect();

      return;
    }

    next();
  } catch (error) {
    sendServerError(res, error);
  }
};

export default validatePeople;
