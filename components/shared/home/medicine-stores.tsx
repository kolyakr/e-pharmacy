import PharmacyItem from "@/components/pharmacy-item";
import { NEAREST_PHARMACIES_LIMIT } from "@/constants";
import prisma from "@/db/db";
import React from "react";
import SectionHeader from "./section-header";
import { unstable_cache } from "next/cache";

const getNearestPharmacies = unstable_cache(
  async () => {
    return await prisma.pharmacy.findMany({
      take: NEAREST_PHARMACIES_LIMIT,
    });
  },
  ["nearest-pharmacies"],
  { revalidate: 60 * 60 }
);

const MedicineStores = async () => {
  const nearestPharmacies = await getNearestPharmacies();

  return (
    <div className="flex flex-col gap-[40px] mb-[80px]">
      <SectionHeader
        title="Your Nearest Medicine Store"
        description="Search for Medicine, Filter by your location"
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {nearestPharmacies.map((pharmacy) => (
          <li key={pharmacy.id}>
            <PharmacyItem pharmacy={pharmacy} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineStores;
