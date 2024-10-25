import { PrismaClient } from "@prisma/client";
import _globals from "../config/_globals";
import logger from "../config/_logger";

export const deleteUnverifiedAccounts = async () => {
  const prisma = new PrismaClient();

  try {
    const verificationCount = await prisma.emailVerification.deleteMany({
      where: {
        createdAt: {
          lt: new Date(Date.now() - _globals().THIRTY_MIN),
        },
      },
    });

    const peopleCount = await prisma.people.deleteMany({
      where: {
        status: false,
        createdAt: {
          lt: new Date(Date.now() - _globals().THIRTY_MIN),
        },
      },
    });

    logger.info(
      `Deleted ${verificationCount.count} expired email verifications`
    );

    logger.info(`Deleted ${peopleCount.count} unverified accounts`);
  } catch (error) {
    logger.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
