import React from "react";
import Logo from "../logo";
import { links } from "@/constants";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-greenColor">
      <div className="w-full max-w-7x wrapper">
        <div className="flex flex-col justify-between pb-[60px] md:flex-row md:items-center border-b  border-whiteBlackColor">
          <div className="flex flex-col mb-10">
            <Logo />
            <p className="text-whiteColor max-w-[261px] mt-[20px]">
              Get the medicine to help you feel better, get back to your active
              life, and enjoy every moment.
            </p>
          </div>
          <div className="flex gap-8">
            {links.map((link) => (
              <Link
                className="text-whiteColor font-semibold"
                href={link.href}
                key={link.name}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center pt-[40px]">
          <div className="text-xs text-whiteColor">
            © E-Pharmacy {year}. All Rights Reserved | Privacy Policy | Terms &
            Conditions
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
