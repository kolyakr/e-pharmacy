export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "E-Pharmacy";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "E-Pharmacy is a modern platform for ordering medicines and healthcare products online with fast delivery and excellent customer support.";

export const linksName = {
  HOME: "Home",
  MEDICINE_STORE: "Medicine store",
  MEDICINE: "Medicine",
};

export const links = [
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

export const INITIAL_ACTION_STATE = {
  success: false,
  message: "",
};
