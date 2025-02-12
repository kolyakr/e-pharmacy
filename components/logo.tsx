import { APP_NAME } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Type = "white" | "green";

const Logo = ({ type = "white" }: { type?: Type }) => {
  return (
    <Link href="/" className="flex gap-3 items-center">
      <Image
        src={`/images/${type}-icon.svg`}
        alt={`${APP_NAME} logo}`}
        width={44}
        height={44}
        priority={true}
      />
      <p
        className={cn(
          "font-bold",
          { "text-whiteColor": type === "white" },
          { "text-blackColor": type === "green" }
        )}
      >
        E-Pharmacy
      </p>
    </Link>
  );
};

export default Logo;
