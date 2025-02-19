"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { productCategory } from "@/constants";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { parseFilterParams } from "@/lib/utils";

const MedicineFilter = () => {
  const searchParams = useSearchParams();
  const { category, name } = parseFilterParams(
    searchParams.get("category"),
    searchParams.get("name")
  );

  const [currCategory, setCurrCategory] = useState<string | null>(
    category || null
  );
  const [currProductName, setCurrProductName] = useState<string | null>(
    name || null
  );

  const router = useRouter();

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (
      currCategory &&
      productCategory.map((product) => product.name).includes(currCategory)
    ) {
      params.set("category", currCategory);
    } else {
      params.delete("category");
      setCurrCategory(null);
    }
    if (currProductName && currProductName.length > 0) {
      params.set("name", currProductName);
    } else {
      params.delete("name");
      setCurrProductName(null);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row mb-10">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full max-w-[335px] justify-between px-[18px] py-[13px] border text-[#1D1E2166] rounded-[60px] md:max-w-[214px] ">
          <p className="font-[400] text-[12px] leading-[18px]">
            {currCategory || "Product category"}
          </p>
          <Image
            src="/images/chevron-down.svg"
            alt="product category filter button"
            width={16}
            height={16}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {productCategory.map((product) => (
            <DropdownMenuItem
              key={product.name}
              onSelect={() => setCurrCategory(product.name)}
              className={`${
                product.name === currCategory ? "text-greenColor" : ""
              }`}
            >
              {product.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={() => setCurrCategory(null)}>
            None
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-full max-w-[335px] relative md:max-w-[214px]">
        <input
          type="text"
          className="w-full  px-[18px] py-[13px] pr-[45px] border rounded-[60px] font-[400] text-[12px] leading-[18px]"
          placeholder="Search medicine"
          onChange={(e) => setCurrProductName(e.target.value)}
          defaultValue={currProductName || ""}
        />
        <Image
          src="/images/search.svg"
          alt="search"
          width={16}
          height={16}
          className="absolute top-[15px] right-[18px]"
        />
      </div>

      <Button
        onClick={handleFilter}
        asChild
        className="hover:bg-green-900 cursor-pointer px-[30px] py-[13px] max-w-[116px] rounded-[60px] bg-greenColor text-whiteColor "
      >
        <div>
          <Image src="/images/filter.svg" alt="filter" width={14} height={14} />
          <p className="font-[500] text-[14px]  leading-[18px]">Filter</p>
        </div>
      </Button>
    </div>
  );
};

export default MedicineFilter;
