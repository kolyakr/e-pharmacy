import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/actions/user.actions";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Type = "green" | "white";

const HeaderUser = async ({
  className,
  type = "white",
}: {
  className?: string;
  type?: Type;
}) => {
  const session = await auth();

  return (
    <>
      {session ? (
        <form action={logoutUser}>
          <Button
            type="submit"
            variant="ghost"
            className={cn("py-4 px-8 rounded-full text-sm font-normal border", {
              "text-whiteColor": type === "white",
              "text-greenColor": type === "green",
            })}
          >
            Logout
          </Button>
        </form>
      ) : (
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
      )}
    </>
  );
};

export default HeaderUser;
