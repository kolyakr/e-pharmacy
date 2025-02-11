import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const HeaderUser = ({ className }: { className?: string }) => {
  return (
    <nav className={cn("flex gap-4 items-center", className)}>
      <Link href="/register">
        <Button
          className="text-whiteColor py-4 px-8 border rounded-full min-h-[46px] font-normal text-sm"
          variant="ghost"
        >
          Register
        </Button>
      </Link>
      <Link
        className="text-whiteColor underline font-normal text-sm"
        href="/login"
      >
        Login
      </Link>
    </nav>
  );
};

export default HeaderUser;
