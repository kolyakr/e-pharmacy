import Pagination from "@/components/pagination";
import PharmacyItem from "@/components/pharmacy-item";
import { PHARMACIES_PER_PAGE } from "@/constants";
import prisma from "@/db/db";
import { parsePaginationParams } from "@/lib/utils";
import React from "react";

const MedicineStorePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; perPage: string }>;
}) => {
  const urlSearchParams = await searchParams;
  const { page, perPage } = parsePaginationParams(
    urlSearchParams.page,
    urlSearchParams.perPage,
    PHARMACIES_PER_PAGE
  );
  const skip = page === 1 ? 1 : (page - 1) * perPage;

  const pharmaciesCount = await prisma.pharmacy.count();
  const pharmacies = await prisma.pharmacy.findMany({
    skip: skip,
    take: perPage,
  });

  return (
    <div className="wrapper">
      <h2 className="font-[600] text-[28px] leading-[32px] mb-10">
        Medicine store
      </h2>
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {pharmacies && pharmacies.length > 0 ? (
          pharmacies.map((pharmacy, index) => (
            <li key={index}>
              <PharmacyItem type="medicine-store" pharmacy={pharmacy} />
            </li>
          ))
        ) : (
          <p>Pharmacies not found</p>
        )}
      </ul>
      {pharmacies && pharmacies.length > 0 && (
        <Pagination count={pharmaciesCount} take={PHARMACIES_PER_PAGE} />
      )}
    </div>
  );
};

export default MedicineStorePage;
