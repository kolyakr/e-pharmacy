import Image from "next/image";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import HeaderUser from "./header-user";
import HeaderNav from "./header-nav";

const HeaderBurgerMenu = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/images/burger-menu.svg"
            alt="burger menu"
            width={32}
            height={32}
          />
        </SheetTrigger>
        <SheetContent className="bg-greenColor flex flex-col">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex h-full flex-col pb-[64px] items-center">
            <div className="flex-1 flex justify-center items-center">
              <HeaderNav type="column" />
            </div>
            <HeaderUser />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HeaderBurgerMenu;
