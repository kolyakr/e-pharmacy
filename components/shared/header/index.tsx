import Logo from "@/components/logo";
import React from "react";
import NavHeader from "./header-nav";
import HeaderUser from "./header-user";
import HeaderBurgerMenu from "./header-burger-menu";

const Header = () => {
  return (
    <header className="w-full bg-greenColor">
      <div className="wrapper  flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex">
          <NavHeader type="row" />
        </div>
        <div className="hidden md:flex">
          <HeaderUser />
        </div>

        {/* mobile */}
        <HeaderBurgerMenu />
      </div>
    </header>
  );
};

export default Header;
