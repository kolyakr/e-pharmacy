"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { placeOrderSchema } from "../validator";
import { auth } from "../auth";
import { getCart } from "../cart";
import prisma from "@/db/db";
import { calcCartPrice, formatError } from "../utils";
import { revalidatePath } from "next/cache";

export const placeOrder = async (
  previousState: unknown,
  formData: FormData
) => {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      payment_method: formData.get("payment_method"),
      phone: formData.get("phone"),
    };
    const parsedData = placeOrderSchema.parse(data);

    const session = await auth();

    const user = await session?.user;
    const cart = await getCart(user);

    if (!cart) {
      throw new Error("cart is missing");
    }

    const productsWithNulls = await Promise.all(
      cart?.CartItems.map((item) =>
        prisma.product.findUnique({
          where: { id: item.productId },
        })
      ) || []
    );

    const products = productsWithNulls.filter(Boolean);

    await prisma.order.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        address: parsedData.address,
        payment_method: parsedData.payment_method,
        phone: parsedData.phone,
        customerId: cart?.customerId,
        products: cart?.CartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        ) as number,
        status: "PENDING",
        price: calcCartPrice(cart, products),
      },
    });

    await Promise.all(
      cart.CartItems.map((item) =>
        prisma.cartItems.delete({
          where: { id: item.id },
        })
      )
    );

    revalidatePath("/");

    return {
      success: true,
      message: "Order was placed successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: formatError(error),
    };
  }
};
