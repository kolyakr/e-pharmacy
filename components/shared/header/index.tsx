import Logo from "@/components/logo";
import React from "react";
import NavHeader from "./header-nav";
import HeaderUser from "./header-user";
import HeaderBurgerMenu from "./header-burger-menu";
import HeaderCart from "./header-cart";

const Header = () => {
  return (
    <header className="w-full bg-greenColor">
      <div className="wrapper  flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex">
          <NavHeader type="row" />
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-[10px]">
            <HeaderCart />
            {/* mobile */}
            <HeaderBurgerMenu />
          </div>
          <div className="hidden md:flex">
            <HeaderUser />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
