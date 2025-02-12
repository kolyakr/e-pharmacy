import Logo from "@/components/logo";
import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen">
      <div className="wrapper">
        <div className="mb-[50px] xl:mb-[150px]">
          <Logo type="green" />
        </div>
        <div className="flex flex-col  w-full md:max-w-[614px] xl:max-w-7xl xl:flex-row  xl:gap-[50px] xl:items-start xl:justify-between">
          <div className="max-w-[335px] md:max-w-[614px] w-full relative mb-[20px] mx-auto xl:min-w-[614px]">
            <div className="text-[28px] md:text-[54px] font-bold text-blackColor xl:text-[50px] xl:w-full">
              Your medication, delivered Say goodbye to all
              <span className="text-greenColor"> your healthcare</span> worries
              with us
            </div>
            <div className="absolute top-[-45px] right-[10px] md:top-[-70px] md:right-[-15px] xl:top-[-90px] xl:right-[20px]">
              <div className="relative min-w-[95px] min-h-[93px] md:min-h-[175px] md:min-w-[179px]">
                <Image
                  src="/images/white-round-pill.png"
                  alt="pill"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
      <div className="absolute bottom-0 right-0">
        <Image
          src="/images/elements.png"
          alt="elements"
          width={264}
          height={249}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
