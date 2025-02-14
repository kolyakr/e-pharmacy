import AddPharmacyPromoSection from "@/components/shared/home/add-pharmacy-promo-section";
import MainBanner from "@/components/shared/home/main-banner";
import MedicineStores from "@/components/shared/home/medicine-stores";
import PromoBanners from "@/components/shared/home/promo-banners";
import Reviews from "@/components/shared/home/reviews";
import { auth } from "@/lib/auth";
import React from "react";

const HomePage = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <div className="bg-greenColor w-full flex align-center justify-center ">
        <MainBanner />
      </div>
      <div className="wrapper">
        <PromoBanners />
        <MedicineStores />
        <AddPharmacyPromoSection />
        <Reviews />
      </div>
    </div>
  );
};

export default HomePage;
