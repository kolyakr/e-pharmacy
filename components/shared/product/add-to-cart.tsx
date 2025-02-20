"use client";

import {
  addProductToCart,
  deleteProductFromCart,
} from "@/lib/actions/product.actions";
import { Product } from "@/types";
import React, { useState } from "react";

type Type = "medicine" | "product";
type Action = "increment" | "decrement";

const AddToCart = ({
  type = "medicine",
  product,
  cart,
}: {
  type: Type;
  product: Product;
  cart:
    | ({
        CartItems: {
          id: string;
          productId: string;
          cartId: string;
          quantity: number;
        }[];
      } & {
        id: string;
        customerId: string;
      })
    | null;
}) => {
  const cartItem = cart?.CartItems.find(
    (item) => item.productId === product.id
  );
  const [isInCart, setIsInCart] = useState(!!cartItem);
  const [quantity, setQuantity] = useState<number>(cartItem?.quantity ?? 1);

  const handleQuantity = (action: Action) => {
    if (action === "increment" && quantity < product.stock) {
      if (isInCart) {
        handleAddToCart(1);
      }
      setQuantity((prev) => prev + 1);
    } else if (action === "decrement" && quantity !== 1) {
      if (isInCart) {
        handleAddToCart(-1);
      }
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async (isInCartQuantity: number | void) => {
    if (!cart) {
      //module window
      throw new Error("not authorized");
    }

    const stock = isInCartQuantity === undefined ? quantity : isInCartQuantity;

    await addProductToCart(product.id, cart?.id, stock);
    setIsInCart(true);
  };

  const handleDeleteFromCart = async () => {
    if (!cart) {
      //module window
      throw new Error("not authorized");
    }

    await deleteProductFromCart(product.id, cart?.id);
    setIsInCart(false);
  };

  if (product.stock === 0) {
    return <p>Out of stock</p>;
  }

  return (
    <div className="flex justify-between items-center">
      {type === "product" && (
        <div className="py-3 px-[18px] border border-[#1D1E211A] flex justify-around items-center w-full max-w-[108px] rounded-[60px]">
          <div
            onClick={() => handleQuantity("increment")}
            className="text-greenColor text-[20px] leading-[20px] cursor-pointer"
          >
            +
          </div>
          <p>{quantity}</p>
          <div
            onClick={() => handleQuantity("decrement")}
            className="text-greenColor text-[20px] leading-[20px] cursor-pointer"
          >
            -
          </div>
        </div>
      )}
      {!isInCart ? (
        <button
          className={`text-whiteColor bg-greenColor font-[500] text-[14px] ${
            type === "medicine"
              ? "py-[10px] px-4   leading-[14px] rounded-[24px]"
              : "py-[13px] px-[32px] rounded-[60px] leading-[18px]"
          }  `}
          onClick={() => handleAddToCart()}
        >
          Add to cart
        </button>
      ) : (
        <button
          className={`text-[#E85050] bg-[#E850501A] font-[500] text-[14px] ${
            type === "medicine"
              ? "py-[10px] px-4   leading-[14px] rounded-[24px]"
              : "py-[13px] px-[32px] rounded-[60px] leading-[18px]"
          }  `}
          onClick={handleDeleteFromCart}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default AddToCart;
