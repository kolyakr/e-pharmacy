"use server";

import prisma from "@/db/db";
import { revalidatePath } from "next/cache";

export const addProductToCart = async (
  productId: string,
  cartId: string,
  quantity: number
) => {
  try {
    await prisma.cartItems.upsert({
      where: {
        cartId_productId: { cartId, productId },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        productId: productId,
        cartId: cartId,
        quantity: quantity,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error(`Failed to add to cart. Error: ${error}`);
  }
};

export const deleteProductFromCart = async (
  productId: string,
  cartId: string
) => {
  try {
    await prisma.cartItems.delete({
      where: {
        cartId_productId: { cartId, productId },
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error(`Failed to delete from cart. Error: ${error}`);
  }
};
