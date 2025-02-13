"use client";

import { Button } from "@/components/ui/button";
import { INITIAL_ACTION_STATE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { loginUser, registerUser } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

type Type = "register" | "login";

const AuthButton = ({ type }: { type: Type }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="py-[13px] min-h-[44px] bg-greenColor rounded-full w-full text-sm"
      type="submit"
      disabled={pending}
    >
      {pending === true
        ? "Submitting..."
        : type === "register"
        ? "Register"
        : "Log in"}
    </Button>
  );
};

const AuthForm = ({ type }: { type: Type }) => {
  const authAction = type === "register" ? registerUser : loginUser;
  const [state, action] = useActionState(authAction, INITIAL_ACTION_STATE);
  const { toast } = useToast();

  useEffect(() => {
    console.log("state: ", state);
    if (state.message && state.message !== "" && state.success) {
      toast({
        title: state.message,
        variant: "default",
      });
    }

    if (state.message && state.message !== "" && !state.success) {
      toast({
        title: state.message,
        variant: "destructive",
      });
    }

    console.log("state: ", state);
  }, [state]);

  return (
    <form
      action={action}
      className="max-w-[335px] w-full mx-auto md:mx-0 md:max-w-[614px] md:w-full xl:max-w-[574px]"
    >
      <div
        className={cn("grid grid-cols-1 gap-3 mb-[20px] md:mb-[62px]", {
          "md:grid-cols-2 w-full": type === "register",
          "md: max-w-[323px]": type === "login",
        })}
      >
        {type === "register" && (
          <input
            className="py-[13px] pl-[18px] rounded-full border border-grayColor text-xs"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
        )}
        <input
          className="py-[13px] pl-[18px] rounded-full border border-grayColor text-xs"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        {type === "register" && (
          <input
            className="py-[13px] pl-[18px] rounded-full border border-grayColor text-xs"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone number"
            defaultValue={"+380"}
            required
          />
        )}
        <input
          className="py-[13px] pl-[18px] rounded-full border border-grayColor text-xs"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <div className="flex flex-col items-center gap-3 mb-[100px] md:max-w-[323px]">
        <AuthButton type={type} />
        <Link
          className="text-xs text-[#1D1E2166]"
          href={type === "register" ? "/login" : "/register"}
        >
          {type === "register"
            ? "Already have an account?"
            : "Don`t have an account?"}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
