import { prisma } from "../prisma/prisma.js";
import asyncHandler from "express-async-handler";
import { firstMessage, serviceMessage } from "../sender/sender.js";

export const registerSearch = asyncHandler(async (req, res) => {
  const { email, searchData } = req.body;

  const {
    name,
    surname,
    fatherName,
    age,
    soldatId,
    contractDate,
    locateCall,
    stateNumber,
    callSign,
    specialSigns,
  } = JSON.parse(searchData);

  if (!email || !searchData || !req.body) {
    res.status(401);
    throw new Error("No such data");
  }

  try {
    const register = await prisma.user.create({
      data: {
        email: email,
        searchObjects: {
          create: {
            name: name,
            surname: surname,
            fatherName: fatherName,
            age: age,
            soldatId: soldatId,
            contractDate: contractDate,
            locateCall: locateCall,
            stateNumber: stateNumber,
            callSign: callSign,
            specialSigns: specialSigns,
          },
        },
      },
    });

    try {
      if (!register) {
        res.status(400);
        throw new Error(`Error in create entry: ${error}`);
      }
      firstMessage(email);
      serviceMessage(JSON.stringify(req.body));
    } catch (error) {
      res.status(400);
      throw new Error(`Error in send mail: ${error}`);
    }

    res.status(200);
    res.json({ message: "success" });
  } catch (error) {
    res.status(400);
    throw new Error(`Error: ${error}`);
  }
});

export const checkCurrentSearhes = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401);
    throw new Error("No such data");
  }

  try {
    const check = await prisma.user.findMany({
      where: {
        email: email,
      },
      include: {
        searchObjects: true,
      },
    });

    res.status(200);
    res.json({ message: "success", check });
  } catch (error) {
    res.status(400);
    throw new Error(`Error in search entry: ${error}`);
  }
});

export const getAllEmail = asyncHandler(async (req, res) => {
  try {
    const emails = await prisma.user.findMany({
      select: {
        email: true,
      },
    });

    res.status(200);
    res.json(emails);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in request: ${error}`);
  }
});
