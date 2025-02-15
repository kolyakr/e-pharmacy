"use client";

import { createPagesList } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Type = "next" | "back";

const DotCircle = () => {
  return (
    <div className=" w-[35px] h-[35px] rounded-full border flex justify-center items-center md:w-[44px] md:h-[44px]  ">
      ...
    </div>
  );
};

const NavCircle = ({
  type,
  number,
  action,
}: {
  type: Type;
  number: number;
  action: () => void;
}) => {
  if (number > 2) {
    throw new Error("Number can not be bigger than 2");
  }

  return (
    <div
      onClick={action}
      className="relative w-[35px] h-[35px] md:w-[44px] md:h-[44px] rounded-full border flex justify-center items-center cursor-pointer"
    >
      <Image
        src={`/images/${type}.svg`}
        alt={type}
        width={20}
        height={20}
        className={`absolute ${
          number === 2
            ? type === "back"
              ? "right-[10px] md:right-[7px]"
              : "left-[10px] md:left-[7px]"
            : ""
        }`}
      />
      {number === 2 && (
        <Image
          src={`/images/${type}.svg`}
          alt={type}
          width={20}
          height={20}
          className={`absolute ${
            number === 2
              ? type === "back"
                ? "left-[10px] md:left-[7px]"
                : "right-[10px] md:right-[7px]"
              : ""
          }`}
        />
      )}
    </div>
  );
};

const Pagination = ({ count, take }: { count: number; take: number }) => {
  const allPages = Math.ceil(count / take);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));

  const [currPage, setCurrPage] = useState<number>(page || 1);
  const [pages, setPages] = useState<number[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const allPagesList = createPagesList(currPage, allPages);

    let visiblePages;
    if (isSmallScreen) {
      if (currPage === 1) {
        visiblePages = allPagesList.slice(0, 2);
      } else if (currPage === allPages) {
        visiblePages = allPagesList.slice(-2);
      } else {
        visiblePages = [currPage - 1, currPage];
      }
    } else {
      visiblePages = allPagesList.slice(-3);
    }

    setPages(visiblePages);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", `${currPage}`);
    params.set("perPage", `${take}`);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [currPage, allPages, isSmallScreen, searchParams, router, take]);

  return (
    <div className="flex justify-center items-center gap-[17px]">
      <div className="flex gap-1 items-center">
        <NavCircle type="back" number={2} action={() => setCurrPage(1)} />
        <NavCircle
          type="back"
          number={1}
          action={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
        />
      </div>
      <div className="flex gap-1 items-center">
        {currPage !== 1 && currPage !== 2 ? <DotCircle /> : ""}
        {pages.map((page) => (
          <div
            key={page}
            className={`w-[35px] h-[35px] md:w-[44px] md:h-[44px] font-[700] text-[14px] leading-[18px] md:text-[18px] md:leading-[22px]  rounded-full border flex justify-center items-center cursor-pointer
              ${page === currPage ? "bg-greenColor text-whiteColor" : ""}`}
            onClick={() => setCurrPage(page)}
          >
            {page}
          </div>
        ))}
        {!isSmallScreen ? (
          currPage !== allPages && currPage !== allPages - 1 ? (
            <DotCircle />
          ) : (
            ""
          )
        ) : currPage != allPages ? (
          <DotCircle></DotCircle>
        ) : (
          ""
        )}
      </div>
      <div className="flex gap-1 items-center">
        <NavCircle
          type="next"
          number={1}
          action={() => setCurrPage((prev) => Math.min(prev + 1, allPages))}
        />
        <NavCircle
          type="next"
          number={2}
          action={() => setCurrPage(allPages)}
        />
      </div>
    </div>
  );
};

export default Pagination;
