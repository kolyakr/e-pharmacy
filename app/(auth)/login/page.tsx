import { Metadata } from "next";
import React from "react";
import AuthForm from "../auth-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Log in",
};

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await searchParams;

  const session = await auth();
  if (session) {
    redirect(callbackUrl || "/");
  }

  return <AuthForm type="login" />;
};

export default LoginPage;
