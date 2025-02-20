import { Product as ProductType } from "@/types";
import Image from "next/image";
import React from "react";
import AddToCart from "./add-to-cart";
import { auth } from "@/lib/auth";
import { getCart } from "@/lib/cart";
import { convertToPlainObject } from "@/lib/utils";

const Product = async ({ product }: { product: ProductType }) => {
  const session = await auth();

  const cart = await getCart(session?.user);

  return (
    <div className="w-full flex flex-col gap-2 md:flex-row md:gap-4 md:max-h-[284px] md:h-full xl:flex-col xl:max-h-[709px] xl:w-[364px]">
      <div className="flex justify-center w-full md:max-w-[364px] p-5 rounded-[27px] border border-greenColor">
        <Image
          src="/images/white-round-pill.png"
          alt={product.name}
          width={364}
          height={337}
          className=" md:h-[200px] md:w-[200px]"
        />
      </div>
      <div className="flex flex-col rounded-[20px] p-5 border gap-[32px] md:justify-between w-full">
        <div className="flex justify-between items-center md:flex-col md:items-start md:gap-[32px] xl:flex-row">
          <div>
            <p className="font-[600] text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] ">
              {product.name}
            </p>
            <p className="text-[#1D1E2199] font-[400] text-[12px] leading-[18px]">
              Brand: {product.suppliers}
            </p>
          </div>
          <p className="font-[600] text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] ">
            ৳{product.price}
          </p>
        </div>
        <AddToCart
          type="product"
          product={convertToPlainObject(product)}
          cart={convertToPlainObject(cart)}
        />
      </div>
    </div>
  );
};

export default Product;
