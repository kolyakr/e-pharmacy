import React from "react";
import MedicineProduct from "../product/medicine-product";
import { Product } from "@/types";

const MedicineProductList = ({ products }: { products: Product[] }) => {
  return (
    <ul className="grid grid-cols-1 gap-5 place-items-center md:grid-cols-3 xl:grid-cols-4 mb-10">
      {products.map((product) => (
        <li key={product.id}>
          <MedicineProduct product={product} />
        </li>
      ))}
    </ul>
  );
};

export default MedicineProductList;
