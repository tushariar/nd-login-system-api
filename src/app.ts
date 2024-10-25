import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import logger from "./config/_logger";
import { setupSwagger } from "./config/_swagger";
import enableCrons from "./crons";
import validateJSON from "./middleware/app/validateJSON";
import appRouter from "./routers/_appRouter";

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(validateJSON);

// Setup swagger
setupSwagger(app);

// App Router
app.use("/", appRouter);

// Start the server
app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT} 🚀`);
  logger.info(`MODE: ${process.env.NODE_ENV} ✨`);

  enableCrons();
});
