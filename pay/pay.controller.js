import { prisma } from "../prisma/prisma.js";
import asyncHandler from "express-async-handler";
import { firstMessage, serviceMessage } from "../sender/sender.js";

export const successPay = asyncHandler(async (req, res) => {
  const { order_id, email } = req.body;

  console.log(req.body, req.query)

  if (!order_id || !email) {
    throw new Error(`no data: ${email} ${order_id}`);
  }

  try {
    const checkData = await prisma.user.findFirst({
      where: {
        email: email,
        searchObjects: {
          every: {
            orderId: order_id,
          },
        },
      },
      include: {
        searchObjects: true,
      },
    });

    if (checkData) {
      const updateStatus = await prisma.searchObject.update({
        where: {
          orderId: order_id,
        },
        data: {
          status: "success pay",
        },
      });

      if (updateStatus) {
        firstMessage(email);
        serviceMessage();
      }
    }
  } catch (error) {
    throw new Error(error);
  }
});
