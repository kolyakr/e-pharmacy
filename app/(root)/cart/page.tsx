import CartForm from "@/components/shared/cart/cart-form";
import CartList from "@/components/shared/cart/cart-list";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const CartPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="wrapper">
      <div className="flex flex-col gap-20">
        <CartForm />
        <CartList />
      </div>
    </div>
  );
};

export default CartPage;
