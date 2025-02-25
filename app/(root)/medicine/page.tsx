import Pagination from "@/components/pagination";
import MedicineFilter from "@/components/shared/medicine/medicine-filter";
import MedicineProductList from "@/components/shared/medicine/medicine-product-list";
import { PRODUCTS_PER_PAGE } from "@/constants";
import prisma from "@/db/db";
import { parseFilterParams, parsePaginationParams } from "@/lib/utils";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const MedicinePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    name?: string;
    page?: string;
    perPage?: string;
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

  const getProducts = unstable_cache(
    async () => {
      const [products, count] = await prisma.$transaction([
        prisma.product.findMany({
          take: perPage,
          skip: page > 1 ? (page - 1) * perPage : 0,
          where: {
            ...(category ? { category } : {}),
            ...(name ? { name: { contains: name, mode: "insensitive" } } : {}),
          },
        }),
        prisma.product.count({
          where: {
            ...(category ? { category } : {}),
            ...(name ? { name: { contains: name, mode: "insensitive" } } : {}),
          },
        }),
      ]);

      return { products, count };
    },
    [`medicine-${page}-${perPage}-${name || ""}-${category || ""}`],
    { revalidate: 60 }
  );

  const { products, count } = await getProducts();

  if (count <= perPage && (urlSearchParams.page || urlSearchParams.perPage)) {
    const queryParams = new URLSearchParams();
    if (category) queryParams.set("category", category);
    if (name) queryParams.set("name", name);

    const newUrl = `/medicine${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    redirect(newUrl);
  }

  return (
    <div className="wrapper">
      <h2 className="font-[600] text-[28px] leading-[32px] mb-10">
        Medicine store
      </h2>
      <MedicineFilter />
      <>
        {products.length > 0 ? (
          <MedicineProductList products={products} />
        ) : (
          <p className="font-[600] text-[24px] leading-[30px] mb-10 ">
            Products not found
          </p>
        )}
      </>
      {products.length >= PRODUCTS_PER_PAGE && (
        <Pagination count={count} take={PRODUCTS_PER_PAGE} />
      )}
    </div>
  );
};

export default MedicinePage;
