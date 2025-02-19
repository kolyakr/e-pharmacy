"use client";

import { Button } from "@/components/ui/button";
import { productCategory } from "@/constants";
import React, { useState } from "react";

type Type = "description" | "reviews";

const ProductDetails = ({
  category,
  children,
}: {
  category: string;
  children: React.ReactNode;
}) => {
  const [currDetails, setCurrDetails] = useState<Type>("description");

  return (
    <div className="p-10 border rounded-[27px] flex flex-col gap-10 justify-center xl:justify-start xl:w-[800px]">
      <div className="flex gap-2">
        <Button
          onClick={() => setCurrDetails("description")}
          className={`hover:bg-greenColor hover:text-whiteColor py-2 px-[25px] bg-greenWhiteColor text-greenColor rounded-[40px] text-[14px] font-[500] leading-[17px] ${
            currDetails === "description" ? "bg-greenColor text-whiteColor" : ""
          }`}
        >
          Description
        </Button>
        <Button
          onClick={() => setCurrDetails("reviews")}
          className={`hover:bg-greenColor hover:text-whiteColor py-2 px-[25px] bg-greenWhiteColor text-greenColor rounded-[40px] text-[14px] font-[500] leading-[17px] ${
            currDetails === "reviews" ? "bg-greenColor text-whiteColor" : ""
          }`}
        >
          Reviews
        </Button>
      </div>
      {currDetails === "description" ? (
        <div>
          {
            productCategory.find((product) => product.name === category)
              ?.description
          }
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default ProductDetails;
