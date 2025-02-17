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

export const promoBanners = [
  {
    name: "Huge Sale",
    sale: "70%",
    linkText: "Shop now",
    href: "/",
  },
  {
    name: "Secure delivery",
    sale: "100%",
    linkText: "Read more",
    href: "/",
  },
  {
    name: "Off",
    sale: "35%",
    linkText: "Shop now",
    href: "/",
  },
];

export const NEAREST_PHARMACIES_LIMIT = 6;

export const sectionFeatures = [
  "Take user orders form online",
  "Create your shop profile",
  "Manage your store",
  "Get more orders",
  "Storage shed",
];

export const reviews = [
  {
    src: "/images/user-1.png",
    name: "Maria Tkachuk",
    text: "I recently used this medical platform to book an appointment with a specialist, and I was impressed by how easy and user-friendly the process was. Highly recommended!",
  },
  {
    src: "/images/user-2.png",
    name: "Sergey Rybachok",
    text: "I had a great experience using this medical platform to access my health records. This platform is a game-changer for managing my healthcare needs.",
  },
  {
    src: "/images/user-3.png",
    name: "Natalia Chatuk",
    text: "I recently had a virtual appointment with my doctor through this medical platform, and I was pleasantly surprised by how seamless the experience was. ",
  },
];

export const PAGINATION_VISIBLE_BUTTONS = 3;
export const PHARMACIES_PER_PAGE = 9;
export const PRODUCTS_PER_PAGE = 12;

export const productCategory = [
  "Medicine",
  "Heart",
  "Head",
  "Hand",
  "Leg",
  "Dental Care",
  "Skin Care",
];
