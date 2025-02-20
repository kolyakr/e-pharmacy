import { auth } from "@/lib/auth";
import { getCart } from "@/lib/cart";
import { Product } from "@/types";
import React from "react";
import Image from "next/image";
import Ellipsis from "@/components/ellipsis";
import Link from "next/link";
import AddToCart from "./add-to-cart";
import { convertToPlainObject } from "@/lib/utils";

const MedicineProduct = async ({ product }: { product: Product }) => {
  const session = await auth();

  const cart = await getCart(session?.user);

  return (
    <div className="flex flex-col justify-between gap-2 max-w-[335px] xl:max-w-[280px]">
      <div>
        <Image
          src="/images/white-round-pill.png"
          alt={product.name}
          width={335}
          height={300}
          className="border border-greenColor rounded-[20px]"
        />
      </div>
      <div className="flex flex-col p-5 border rounded-[20px] gap-[17px]">
        <div className="flex align-start justify-between">
          <div className="flex flex-col">
            <Ellipsis
              className="font-[600] text-[16px] leading-[22px] md:text-[18px] md:leading-[25px]"
              text={product.name}
              length={15}
            />
            <p className="font-[400] text-[12px] leading-[22px] md:leading-[18px] text-[#1D1E2199]">
              {product.category}
            </p>
          </div>
          <p className="font-[600] text-[16px] leading-[22px] md:text-[18px] md:leading-[25px]">
            ৳{product.price}
          </p>
        </div>
        <div className="flex align-center justify-between">
          <AddToCart
            type="medicine"
            product={convertToPlainObject(product)}
            cart={convertToPlainObject(cart)}
          />
          <Link
            className="font-[400] text-[12px] leading-[18px] underline"
            href={`medicine/product/${product.id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MedicineProduct;
