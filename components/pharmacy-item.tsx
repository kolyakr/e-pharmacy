import { Pharmacy } from "@prisma/client";
import Image from "next/image";
import React from "react";

const PharmacyItem = ({ pharmacy }: { pharmacy: Pharmacy }) => {
  return (
    <div className="relative bg-greenWhiteColor rounded-[27px] p-8 flex flex-col justify-around overflow-hidden">
      <div className="flex justify-between items-start">
        <p className="font-[600] text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] text-blackColor">
          {pharmacy.name}
        </p>
        <div className="flex gap-[14px] items-start">
          <div className="flex gap-[6px]">
            <Image src="/images/star.svg" alt="star" width={16} height={16} />
            <span className="text-blackColor text-sm font-[500]">
              {pharmacy.rating}
            </span>
          </div>
          <div className="w-[65px] h-[34px] rounded-[8px] text-xs font-[600] py-2 px-4 bg-[#59B17A1A] text-[#59B17A]">
            Open
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[18px]">
        <div className="flex gap-2">
          <Image
            src="/images/map-pin.svg"
            alt="map pin"
            width={18}
            height={18}
          />
          <p className="font-[400] text-sm md:text-[16px] md:leading-[20px] text-[#93939A]">
            {pharmacy.address}
          </p>
        </div>
        <div className="flex gap-2">
          <Image src="/images/phone.svg" alt="phone" width={18} height={18} />
          <p className="font-[400] text-sm md:text-[16px] md:leading-[20px] text-[#93939A]">
            {pharmacy.phone}
          </p>
        </div>
      </div>
      <Image
        src="/images/elements.png"
        alt="elements"
        width={100}
        height={100}
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};

export default PharmacyItem;
