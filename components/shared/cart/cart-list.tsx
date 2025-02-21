"use client";

import Image from "next/image";
import React, { useState } from "react";
import AddToCart from "../product/add-to-cart";
import { convertToPlainObject } from "@/lib/utils";
import { Cart, Product } from "@/types";

const defaultProduct = {
  id: "",
  name: "",
  photo: "",
  suppliers: "",
  stock: 0,
  category: "",
  price: 0,
};

const CartList = ({
  cart,
  products,
}: {
  cart: Cart;
  products: (Product | null)[];
}) => {
  const [productsList, setProductsList] = useState(products);

  const deleteFormProductsList = (productId: string) => {
    setProductsList((prev) => {
      return prev.filter((product) => product?.id !== productId);
    });
  };

  if (productsList.length === 0) {
    return <p>Cart list is empty</p>;
  }

  return (
    <ul className="flex flex-col gap-3 justify-center md:max-w-[704px]  xl:justify-start xl:w-full">
      {productsList.map((product, index) => (
        <li
          className={`flex py-5 gap-3 ${
            index !== products.length - 1 ? "border-b" : ""
          }`}
          key={product?.id}
        >
          <Image
            src="/images/white-round-pill.png"
            alt="cart item image"
            width={122}
            height={133}
            className="w-full h-full max-w-[120px] max-h-[120px] md:max-w-[122px] md:max-h-[133px]"
          />

          <div className="flex flex-col gap-[18px] items-start w-full">
            <div className="flex flex-col gap-3 md:flex-row md:justify-between md:w-full">
              <div className="flex flex-col gap-2">
                <p className="font-[600] text-[16px] leading-[22px] md:text-[18px] md:leading-[25px] ">
                  {product?.name}
                </p>
                <p className="text-[#6A6A6F] font-[400] text-[12px] leading-[14px] md:text-[14px] md:leading-[18px]">
                  {product?.category}
                </p>
              </div>
              <p className="font-[500] text-[12px] leading-[14px] md:text-[14px] md:leading-[18px]">
                ৳{product?.price}
              </p>
            </div>
            <AddToCart
              type="cart"
              cart={convertToPlainObject(cart)}
              product={convertToPlainObject(product) || defaultProduct}
              deleteAction={deleteFormProductsList}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
