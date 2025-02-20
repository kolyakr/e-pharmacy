import prisma from "@/db/db";
import { auth } from "@/lib/auth";
import { getCart } from "@/lib/cart";
import Image from "next/image";
import React from "react";
import AddToCart from "../product/add-to-cart";
import { convertToPlainObject } from "@/lib/utils";

const defaultProduct = {
  id: "",
  name: "",
  photo: "",
  suppliers: "",
  stock: 0,
  category: "",
  price: 0,
};

const CartList = async () => {
  const session = await auth();

  const cart = await getCart(session?.user);

  if (!cart) {
    throw new Error("not authorized");
  }

  const productsWithNulls = await Promise.all(
    cart?.CartItems.map((item) =>
      prisma.product.findUnique({
        where: { id: item.productId },
      })
    ) || []
  );

  const products = productsWithNulls.filter(Boolean);

  if (products.length === 0) {
    return <p>Cart list is empty</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product?.id}>
          <div>
            <Image
              src="/images/white-round-pill.png"
              alt="cart item image"
              width={122}
              height={133}
            />
          </div>
          <div>
            <div>
              <div>
                <p>{product?.name}</p>
                <p>{product?.category}</p>
              </div>
              <p>৳{product?.price}</p>
            </div>
            <AddToCart
              type="cart"
              cart={convertToPlainObject(cart)}
              product={convertToPlainObject(product) || defaultProduct}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
