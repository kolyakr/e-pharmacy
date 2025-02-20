import prisma from "@/db/db";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ProductReviews = async ({ productId }: { productId: string }) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId: productId,
    },
  });

  return (
    <>
      {reviews && reviews.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {reviews.map((review) => (
            <li
              className="flex py-[14px] px-[28px] flex-col gap-[14px] border border-[#F1F1F1] rounded-[20px]"
              key={review.id}
            >
              <div className="flex justify-between gap-[35px]">
                <div className="flex gap-5">
                  <div className="w-[44px] h-[44px] bg-greenWhiteColor border border-blackColor text-blackColor rounded-full flex justify-center items-center">
                    {review.name.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-[600] text-[16px] leading-[22px] md:text-[18px] md:leading-[25px] ">
                      {review.name}
                    </p>
                    <p className="text-[#1D1E2199] font-[400] text-[12px] leading-[18px]">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-[6px] items-start">
                  <Image
                    src="/images/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                    className="md:hidden"
                  />
                  <div className="hidden md:flex gap-[2px]">
                    {[...Array(review.stars)].map((_, index) => (
                      <Image
                        key={index}
                        src="/images/star.svg"
                        alt="star"
                        width={16}
                        height={16}
                      />
                    ))}
                  </div>
                  <p className="font-[500] text-[14px] leading-[18px]">
                    {review.stars}
                  </p>
                </div>
              </div>
              <div className="font-[400] text-[14px] leading-[18px] text-[#6A6A6F]">
                {review.testimonial}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>This product has no reviews yet</p>
      )}
    </>
  );
};

export default ProductReviews;
