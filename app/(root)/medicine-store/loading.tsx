import MedicineProductSkeletonList from "@/components/loaders/medicine-product-skeleton-list";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="wrapper">
      <h2 className="font-semibold text-2xl leading-8 mb-10">Medicine store</h2>
      <MedicineProductSkeletonList />
    </div>
  );
};

export default LoadingPage;
