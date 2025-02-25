import Product from "@/components/shared/product/product";
import ProductDetails from "@/components/shared/product/product-details";
import ProductReviews from "@/components/shared/product/product-reviews";
import prisma from "@/db/db";
import { unstable_cache } from "next/cache";
import React from "react";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const productData = unstable_cache(
    async () => {
      return await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
    },
    [productId],
    {
      revalidate: 60,
    }
  );

  const product = await productData();

  if (!product) {
    return <p>Not found</p>;
  }

  return (
    <div className="wrapper flex items-center justify-center">
      <div className="flex flex-col gap-2 justify-center mx-auto max-w-[500px] md:max-w-[704px] xl:max-w-full xl:flex-row xl:gap-5 xl:justify-between">
        <Product product={product} />
        <ProductDetails category={product.category}>
          <ProductReviews productId={productId} />
        </ProductDetails>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
