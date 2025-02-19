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
  {
    name: "Medicine",
    description: `Medicine plays a crucial role in treating and preventing a wide range of health conditions. From antibiotics and antivirals to pain relievers and anti-inflammatory drugs, these products help manage symptoms, support recovery, and improve overall health. Whether used for chronic conditions, temporary illnesses, or general wellness, medicines are formulated to provide effective and safe solutions under professional guidance.`,
  },
  {
    name: "Heart",
    description:
      "Cardiovascular health is essential for overall well-being, and heart medications are designed to help maintain a strong and healthy heart. These products include blood pressure regulators, cholesterol-lowering drugs, and anticoagulants that improve circulation and reduce the risk of heart disease. Whether managing hypertension, heart failure, or cholesterol levels, heart medications support long-term cardiovascular health and prevent serious complications.",
  },
  {
    name: "Head",
    description:
      "Head pain and discomfort can significantly impact daily life, and specialized medications provide fast and effective relief. These include painkillers, migraine treatments, and anti-inflammatory drugs that target headaches, neuralgia, and tension. Designed for quick absorption and long-lasting effects, these products help restore comfort and improve focus, whether for occasional headaches or chronic conditions.",
  },
  {
    name: "Hand",
    description:
      "Hand care is essential for maintaining soft, healthy skin, especially in harsh environmental conditions. Hand treatments include moisturizers, antiseptic creams, and specialized formulas for cracked or dry skin. Whether protecting against dryness, irritation, or exposure to chemicals, hand care products help restore the skin’s natural barrier and keep hands smooth and nourished.",
  },
  {
    name: "Leg",
    description:
      "Leg health is vital for mobility and circulation, making leg care products essential for an active lifestyle. These include pain relief gels, anti-inflammatory creams, and circulation boosters that help reduce swelling, relieve muscle pain, and improve vascular health. Whether for athletes, individuals with poor circulation, or those recovering from injuries, leg care solutions offer targeted support for comfort and movement.",
  },
  {
    name: "Dental Care",
    description:
      "Good oral hygiene is the foundation of a healthy smile, and dental care products help maintain strong teeth and fresh breath. These include fluoride toothpaste, antibacterial mouthwash, whitening treatments, and dental floss to prevent cavities, gum disease, and bad breath. Regular use of high-quality dental care products supports long-term oral health and keeps your smile bright and fresh.",
  },
  {
    name: "Skin Care",
    description:
      "Skincare products are designed to protect, nourish, and rejuvenate the skin, keeping it healthy and radiant. From moisturizers and cleansers to anti-aging serums and sun protection, skincare solutions address a variety of concerns, including dryness, acne, sensitivity, and wrinkles. Formulated with gentle and effective ingredients, these products help restore balance, improve texture, and enhance overall skin health.",
  },
];

export const fallbackImg = "https://i.ibb.co/bLKP624/5-15-1000x1000-min.jpg";
