import Pagination from "@/components/pagination";
import MedicineFilter from "@/components/shared/medicine/medicine-filter";
import MedicineProduct from "@/components/shared/medicine/medicine-product";
import { PRODUCTS_PER_PAGE } from "@/constants";
import prisma from "@/db/db";
import { parseFilterParams, parsePaginationParams } from "@/lib/utils";
import React from "react";

const MedicinePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    category: string;
    name: string;
    page: string;
    perPage: string;
  }>;
}) => {
  const urlSearchParams = await searchParams;
  const { category, name } = parseFilterParams(
    urlSearchParams.category,
    urlSearchParams.name
  );
  const { page, perPage } = parsePaginationParams(
    urlSearchParams.page,
    urlSearchParams.perPage,
    PRODUCTS_PER_PAGE
  );

  const count = await prisma.product.count();
  const products = await prisma.product.findMany({
    take: perPage,
    skip: page,
    where: category ? { category } : {},
  });

  return (
    <div className="wrapper">
      <h2 className="font-[600] text-[28px] leading-[32px] mb-10">
        Medicine store
      </h2>
      <MedicineFilter />
      <>
        {products && products.length > 0 ? (
          <ul className="grid grid-cols-1 gap-5 place-items-center md:grid-cols-3 xl:grid-cols-4 mb-10">
            {products.map((product) => (
              <li key={product.id}>
                <MedicineProduct product={product} />
              </li>
            ))}
          </ul>
        ) : (
          "Products not found"
        )}
      </>
      <Pagination count={count} take={PRODUCTS_PER_PAGE} />
    </div>
  );
};

export default MedicinePage;
