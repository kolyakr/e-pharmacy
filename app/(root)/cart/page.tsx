import CartForm from "@/components/shared/cart/cart-form";
import CartList from "@/components/shared/cart/cart-list";
import prisma from "@/db/db";
import { auth } from "@/lib/auth";
import { getCart } from "@/lib/cart";
import { convertToPlainObject } from "@/lib/utils";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const CartPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/register");
  }

  const cart = await getCart(session?.user);

  if (!cart) {
    throw new Error("cart is missing");
  }

  const getCachedProducts = unstable_cache(
    async () => {
      const productsWithNulls = await Promise.all(
        cart?.CartItems.map((item) =>
          prisma.product.findUnique({
            where: { id: item.productId },
          })
        ) || []
      );

      const products = productsWithNulls.filter(Boolean);

      return products;
    },
    ["cart-products"],
    {
      revalidate: 60 * 60,
      tags: ["cart-products"],
    }
  );

  const products = await getCachedProducts();

  return (
    <div className="wrapper">
      <div className="flex flex-col gap-20 xl:flex-row xl:justify-between xl:gap-[96px]">
        <CartForm
          cart={convertToPlainObject(cart)}
          products={convertToPlainObject(products)}
        />
        <CartList
          cart={convertToPlainObject(cart)}
          products={convertToPlainObject(products)}
        />
      </div>
    </div>
  );
};

export default CartPage;
