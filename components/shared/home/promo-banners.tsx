import { promoBanners } from "@/constants";
import Link from "next/link";
import React from "react";

const PromoBanners = () => {
  return (
    <ul className="grid grid-cols-1 gap-4 mx-auto place-items-center md:grid-cols-2 lg:grid-cols-3 md:max-w-[670px] lg:max-w-[1019px] mb-[80px]">
      {promoBanners.map((banner, index) => (
        <li
          className="bg-[#FDFDFD] border border-[#F1F1F1] rounded-[27px] px-[18px] py-[14px] flex flex-col gap-[14px] justify-between max-w-[321px] w-full"
          key={banner.name}
        >
          <div className="flex gap-4 items-center">
            <div className="w-[54px] h-[54px] md:w-[74px] md:h-[74px] rounded-full font-[400] text-greenColor bg-[#E7F1ED66] text-2xl md:text-[28px] md:leading-[28px] flex items-center justify-center">
              {index + 1}
            </div>
            <p className="text-blackColor text-[16px] md:text-[20px] md:leading-[28px] font-[500]">
              {banner.name}
            </p>
          </div>
          <div className="flex items-center gap-[30px]">
            <p className="text-2xl md:text-4xl text-blackColor font-[500]">
              {banner.sale}
            </p>
            <Link
              className="text-[#93939A] text-[13px] font-[400]"
              href={banner.href}
            >
              {banner.linkText}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PromoBanners;
