"use client";

import { linksName } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import styles from "./header.module.css";
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";

const links = [
  {
    name: linksName.HOME,
    href: "/",
  },
  {
    name: linksName.MEDICINE_STORE,
    href: "/medicine-store",
  },
  {
    name: linksName.MEDICINE,
    href: "/medicine",
  },
];

type Type = "row" | "column";

const HeaderNav = ({ type }: { type: Type }) => {
  const pathname = usePathname();

  return (
    <>
      <nav
        className={cn("flex gap-2", {
          "flex-col max-w-[134px]": type === "column",
        })}
      >
        {links.map((link) => (
          <Link
            className={cn(
              "relative bg-whiteColor text-[#93939A] p-2 rounded-full border-[8px] border-whiteColor h-[46px] flex items-center justify-center text-sm ",
              {
                [styles.medicineStoreLink]:
                  link.name === linksName.MEDICINE_STORE && type === "row",
              },
              {
                [styles.medicineStoreLinkVertical]:
                  link.name === linksName.MEDICINE_STORE && type === "column",
              },
              {
                "bg-greenColor text-whiteColor": link.href === pathname,
              }
            )}
            href={link.href}
            key={link.name}
          >
            {type === "row" ? (
              <>{link.name}</>
            ) : (
              <SheetClose>{link.name}</SheetClose>
            )}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default HeaderNav;
