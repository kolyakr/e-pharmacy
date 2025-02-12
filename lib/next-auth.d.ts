import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string; // Додаємо phoneNumber
  }

  interface Session {
    user: User;
  }
}
