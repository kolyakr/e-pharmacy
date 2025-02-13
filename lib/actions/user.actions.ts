"use server";
import bcrypt from "bcrypt";
import { signIn, signOut } from "../auth";
import { loginUserSchema, registerUserSchema } from "../validator";
import prisma from "@/db/db";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";

export const loginUser = async (previousState: unknown, formData: FormData) => {
  try {
    const data = loginUserSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", data);

    return { success: true, message: "Login successful" };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return { success: false, message: "Invalid email or password" };
  }
};

export const registerUser = async (
  previousState: unknown,
  formData: FormData
) => {
  try {
    const data = registerUserSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      password: formData.get("password"),
    });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: hashedPassword,
      },
    });

    if (!user) {
      throw new Error("User not created");
    }

    if (user.id && user.role === "USER") {
      await prisma.customer.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          address: "",
        },
      });
    }

    await signIn("credentials", {
      email: user.email,
      password: data.password,
    });

    return { success: true, message: "Registration successful" };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return { success: false, message: formatError(error) };
  }
};

export const logoutUser = async () => {
  await signOut();
};
