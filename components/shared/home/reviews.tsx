import React from "react";
import SectionHeader from "./section-header";
import { reviews } from "@/constants";
import Image from "next/image";

const Reviews = () => {
  return (
    <div className="flex flex-col gap-16 mb-[120px]">
      <SectionHeader
        title="Reviews"
        description="Search for Medicine, Filter by your location"
      />
      <ul className="flex gap-7 justify-center">
        {reviews.map((review, index) => (
          <li
            key={index}
            className={`pt-6 max-w-[351px] relative ${
              index === 1 ? "hidden md:flex xl:flex" : ""
            }, ${index == 2 ? "hidden xl:flex" : ""}`}
          >
            <Image
              src={review.src}
              alt="user image"
              width={64}
              height={64}
              className="absolute left-1/2 top-0 transform -translate-x-1/2"
            />
            <div className="bg-[#FDFDFD] rounded-[27px] py-[54px] px-[28px] flex flex-col items-center justify-center border gap-4">
              <p className="font-[600] text-[20px] leading-[30px]">
                {review.name}
              </p>
              <p className="text-[#93939A] font-[400] text-[16px] leading-[20px] text-center">
                {review.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
