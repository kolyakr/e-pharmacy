import Pagination from "@/components/pagination";
import PharmacyItem from "@/components/pharmacy-item";
import { PHARMACIES_PER_PAGE } from "@/constants";
import prisma from "@/db/db";
import { parsePaginationParams } from "@/lib/utils";
import { unstable_cache } from "next/cache";
import React from "react";

const MedicineStorePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; perPage?: string }>;
}) => {
  const urlSearchParams = await searchParams;
  const { page, perPage } = parsePaginationParams(
    urlSearchParams.page,
    urlSearchParams.perPage,
    PHARMACIES_PER_PAGE
  );

  const getPharmacies = unstable_cache(
    async () => {
      const skip = (page - 1) * perPage;

      const [pharmacies, pharmaciesCount] = await Promise.all([
        prisma.pharmacy.findMany({ skip, take: perPage }),
        prisma.pharmacy.count(),
      ]);

      return { pharmacies, pharmaciesCount };
    },
    [`medicine-store-${page}-${perPage}`],
    { revalidate: 3600 }
  );

  const { pharmacies, pharmaciesCount } = await getPharmacies();

  return (
    <div className="wrapper">
      <h2 className="font-semibold text-2xl leading-8 mb-10">Medicine store</h2>
      {pharmacies.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {pharmacies.map((pharmacy) => (
              <li key={pharmacy.id}>
                <PharmacyItem type="medicine-store" pharmacy={pharmacy} />
              </li>
            ))}
          </ul>
          <Pagination count={pharmaciesCount} take={PHARMACIES_PER_PAGE} />
        </>
      ) : (
        <p className="font-semibold text-xl leading-7 text-gray-500">
          Pharmacies not found
        </p>
      )}
    </div>
  );
};

export default MedicineStorePage;
