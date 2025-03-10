import { auth } from "@/lib/auth";
import { getCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Type = "green" | "white";

const HeaderCart = async ({ type = "white" }: { type?: Type }) => {
  const session = await auth();

  const cart = await getCart(session?.user);

  const quantity =
    cart?.CartItems.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <div className="flex gap-2">
      <Link href="/cart" className="relative">
        <Image src="/images/cart.svg" alt="cart" width={44} height={44} />
        <div className="absolute w-4 h-4 bg-[#E7F1ED] text-greenColor top-0 right-0 rounded-full text-xs font-bold flex align-center justify-center">
          {quantity}
        </div>
      </Link>
      {session && (
        <div
          className={cn(
            "w-[44px] h-[44px] rounded-full flex justify-center items-center text-greenColor",
            { "bg-whiteColor": type === "white" },
            { "bg-greenWhiteColor": type === "green" }
          )}
        >
          {session && session?.user?.name?.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default HeaderCart;
