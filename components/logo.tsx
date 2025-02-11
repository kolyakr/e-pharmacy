import { APP_NAME } from "@/constants";
import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex gap-3 items-center">
      <Image
        src="/images/white-icon.svg"
        alt={`${APP_NAME} logo}`}
        width={44}
        height={44}
        priority={true}
      />
      <p className="text-whiteColor font-bold">E-Pharmacy</p>
    </div>
  );
};

export default Logo;
