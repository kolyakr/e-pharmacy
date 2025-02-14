import Image from "next/image";
import React from "react";

const MainBanner = () => {
  return (
    <section className="wrapper flex items-center justify-center w-full">
      <div className="relative min-w-[331px] min-h-[312px] max-w-[476px] max-h-[322px] w-full h-auto aspect-[749/508]  md:min-w-[704px] md:min-h-[508px] mb-[221px] mt-[172px] md:mb-[230px] md:mt-[158px]">
        <Image
          src="/images/main-banner.png"
          alt="main banner"
          className="object-contain rounded-lg"
          fill
          priority
        />

        <h2 className="absolute top-[10%] md:top-[30%] left-0 text-[50px] md:text-[74px] text-white font-bold  leading-[50px] md:leading-[74px]">
          Your medication delivered
        </h2>

        <p className="absolute bottom-[23%] right-[5%] translate-y-[-50%] max-w-[193px] md:max-w-[240px] text-xs md:text-[18px] md:leading-5 text-white text-left">
          Say goodbye to all your healthcare worries with us
        </p>
      </div>
    </section>
  );
};

export default MainBanner;
