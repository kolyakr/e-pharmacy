import { Pharmacy } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Ellipsis from "./ellipsis";
import { cn } from "@/lib/utils";

type Type = "default" | "medicine-store";

const PharmacyItemInfo = ({
  rating,
  type = "default",
}: {
  rating: number;
  type?: Type;
}) => {
  return (
    <div
      className={`flex gap-[14px] items-start ${
        type === "medicine-store" ? "items-center" : ""
      }`}
    >
      <div className="flex gap-[6px]">
        <Image src="/images/star.svg" alt="star" width={16} height={16} />
        <span className="text-blackColor text-sm font-[500]">{rating}</span>
      </div>
      <div className="w-[65px] h-[34px] rounded-[8px] text-xs font-[600] py-2 px-4 bg-[#59B17A1A] text-[#59B17A]">
        OPEN
      </div>
    </div>
  );
};

const PharmacyItem = ({
  pharmacy,
  type = "default",
}: {
  pharmacy: Pharmacy;
  type?: Type;
}) => {
  return (
    <div
      className={`relative bg-greenWhiteColor rounded-[27px] p-8 ${
        type === "medicine-store" ? "p-10" : ""
      } flex flex-col justify-around overflow-hidden`}
    >
      <div className="flex justify-between items-start">
        <Ellipsis
          className="font-[600] text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] text-blackColor"
          length={13}
          text={pharmacy.name}
        />
        {type === "default" && <PharmacyItemInfo rating={pharmacy.rating} />}
      </div>
      <div className="flex flex-col gap-9">
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
        {type === "medicine-store" && (
          <div
            className={`${
              type === "medicine-store"
                ? "flex items-center justify-between"
                : ""
            }`}
          >
            <Link
              className="max-w-[120px] bg-greenColor text-whiteColor rounded-[24px] px-4 py-[10px] font-[500] text-[14px] leading-[14px]"
              href="/"
            >
              Visit store
            </Link>
            {type === "medicine-store" && (
              <PharmacyItemInfo rating={pharmacy.rating} type={type} />
            )}
          </div>
        )}
      </div>
      <Image
        src="/images/elements.png"
        alt="elements"
        width={200}
        height={200}
        className={cn(
          "absolute",
          type === "default"
            ? "bottom-0 right-0 max-w-[100px] max-h-[100px]"
            : "right-[-30px] top-[0] max-w-[150px] max-h-[150px] scale-y-[-1] rotate-[45deg]"
        )}
      />
    </div>
  );
};

export default PharmacyItem;
