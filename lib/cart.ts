import prisma from "@/db/db";
import { User } from "next-auth";

export const getCart = async (user: User | undefined) => {
  if (!user) {
    return null;
  }

  const customer = await prisma.customer.findUnique({
    where: {
      userId: user?.id,
    },
    include: {
      cart: {
        include: {
          CartItems: true,
        },
      },
    },
  });

  if (!customer) {
    throw new Error("Customer ID is missing");
  }

  if (!customer.cart) {
    const newCart = await prisma.cart.create({
      data: {
        customerId: customer.id,
      },
      include: {
        CartItems: true,
      },
    });

    return newCart;
  }

  return {
    ...customer.cart,
    CartItems: customer.cart.CartItems || [],
  };
};
