import { Product as ProductType } from "@/types";
import Image from "next/image";
import React from "react";

const Product = ({ product }: { product: ProductType }) => {
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
        <div className="flex justify-between items-center">
          <div className="py-3 px-[18px] border border-[#1D1E211A] flex justify-around items-center w-full max-w-[108px] rounded-[60px]">
            <div className="text-greenColor text-[20px] leading-[20px] cursor-pointer">
              +
            </div>
            <p>1</p>
            <div className="text-greenColor text-[20px] leading-[20px] cursor-pointer">
              -
            </div>
          </div>
          <button className="py-[13px] px-[32px] bg-greenColor rounded-[60px] font-[500] text-[14px] leading-[18px] text-whiteColor">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
