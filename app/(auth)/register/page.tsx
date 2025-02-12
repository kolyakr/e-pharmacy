import { Metadata } from "next";
import React from "react";
import AuthForm from "../auth-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register",
};

const Register = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return <AuthForm type="register" />;
};

export default Register;
