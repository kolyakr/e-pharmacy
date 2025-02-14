import React from "react";

const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col w-[335px] md:w-[555px] mx-auto justify-center items-center gap-3">
      <h2 className="text-blackColor text-[28px] md:text-[40px] leading-[32px] md:leading-[48px] text-center font-[600] max-w-[291px] md:max-w-[555px]">
        {title}
      </h2>
      <p className="text-[#93939A] text-sm md:text-[16px] md:leading-[20px] font-[400]">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
