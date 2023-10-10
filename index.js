import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import {
  checkCurrentSearhes,
  getAllEmail,
  registerSearch,
} from "./search/register.controller.js";

const prisma = new PrismaClient();
const app = express();
dotenv.config();

async function main() {
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(morgan("tiny"));

  app.use("/api/create-search/", registerSearch);
  app.use("/api/check-current-searches/", checkCurrentSearhes);
  app.use("/api/get-all-email/", getAllEmail)

  const PORT = 5005;

  app.listen(
    PORT,
    console.log(
      `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
