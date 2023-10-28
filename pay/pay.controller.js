import { prisma } from "../prisma/prisma.js";
import asyncHandler from "express-async-handler";
import { firstMessage, serviceMessage } from "../sender/sender.js";

export const successPay = asyncHandler(async (req, res) => {
  const { order_id, email } = req.body;

  if(!order_id || !email) throw new Error("no data")
    
    try {
        const checkData = await prisma.user.findFirst({
          where: {
            email: email,
            searchObjects: {
              every: {
                id: order_id,
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
                    id: order_id
                },
                data: {
                    status: "success"
                }
            })

            if (updateStatus) {
              firstMessage(email);
              serviceMessage(JSON.stringify(req.body));

              res.status(200);
              res.json(updateStatus);

              res.json(checkData);
            }

        }
        
    } catch (error) {
        throw new Error(error)
    }
    
});
