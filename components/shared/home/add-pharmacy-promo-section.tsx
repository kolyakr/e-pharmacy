import { sectionFeatures } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AddPharmacyPromoSection = () => {
  return (
    <div className="flex flex-col gap-10 mb-[120px]">
      <div className="bg-greenColor rounded-[32px] p-5 md:p-[40px] text-whiteColor flex flex-col gap-[19px] xl:flex-row">
        <div className="py-5 md:py-[64px] flex flex-col gap-[40px] lg:max-w-[501px]">
          <div className="flex flex-col gap-5 md:gap-6">
            <h2 className="font-[600] text-[28px] leading-[32px] md:text-[48px] md:leading-[55px]">
              Add the medicines you need online now
            </h2>
            <p className="font-[400] text-sm max-w-[291px] md:max-w-[488px] md:text-[16px] md:leading-5">
              Enjoy the convenience of having your prescriptions filled from
              home by connecting with your community pharmacy through our online
              platform.
            </p>
          </div>
          <Link
            className="max-w-[165px] md:max-w-[200px] py-[13px] px-8 md:px-[50px] border rounded-[60px] bg-inherit font-[500] text-[14px] leading-[18px]"
            href="/medicine-store"
          >
            Buy medicine
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/images/promo-banner-img.png"
            alt="promo section image"
            width={608}
            height={406}
            className="w-full h-full max-w-[295px] max-h-[335px] md:max-w-[633px] xl:max-h-[406px] xl:max-w-[633px] md:max-h-[406px]"
          />
        </div>
      </div>

      <div className="relative w-full overflow-hidden md:hidden">
        <ul className="scroll-container">
          <div className="scroll-list">
            {sectionFeatures.map((feature, index) => (
              <li
                key={`original-${index}`}
                className="py-2 flex gap-2 items-center"
              >
                <Image
                  src="/images/lightning.svg"
                  alt="lightning"
                  width={20}
                  height={20}
                />
                <p className="text-sm font-[600] leading-[18px]">{feature}</p>
              </li>
            ))}

            {sectionFeatures.map((feature, index) => (
              <li
                key={`duplicate-${index}`}
                className="py-2 flex gap-2 items-center"
              >
                <Image
                  src="/images/lightning.svg"
                  alt="lightning"
                  width={20}
                  height={20}
                />
                <p className="text-sm font-[600] leading-[18px]">{feature}</p>
              </li>
            ))}
          </div>
        </ul>
      </div>

      <ul className="hidden md:flex gap-2 items-center justify-center">
        {sectionFeatures.map((feature, index) => (
          <li key={index} className="py-2 flex gap-2 items-center">
            <Image
              src="/images/lightning.svg"
              alt="lightning"
              width={20}
              height={20}
            />
            <p className="text-sm font-[600] leading-[18px]">{feature}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddPharmacyPromoSection;
