import MedicineProductSkeletonList from "@/components/loaders/medicine-product-skeleton-list";
import React from "react";

const MedicineLoadingPage = () => {
  return (
    <div className="wrapper">
      <h2 className="font-[600] text-[28px] leading-[32px] mb-10">
        Medicine store
      </h2>
      <MedicineProductSkeletonList />
    </div>
  );
};

export default MedicineLoadingPage;
