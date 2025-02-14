import PharmacyItem from "@/components/pharmacy-item";
import prisma from "@/db/db";
import React from "react";

const MedicineStorePage = async () => {
  const pharmacies = await prisma.pharmacy.findMany();

  return (
    <div className="wrapper">
      <h2 className="font-[600] text-[28px] leading-[32px] mb-10">
        Medicine store
      </h2>
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pharmacies.map((pharmacy, index) => (
          <li key={index}>
            <PharmacyItem type="medicine-store" pharmacy={pharmacy} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineStorePage;
