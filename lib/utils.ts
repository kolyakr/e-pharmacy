import { PAGINATION_VISIBLE_BUTTONS, productCategory } from "@/constants";
import { Cart, PaginationParams, Product } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any): string {
  if (error.name === "ZodError") {
    // Handle Zod error
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const message = error.errors[field].message;
      return typeof message === "string" ? message : JSON.stringify(message);
    });

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Handle Prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

export const createPagesList = (currPage: number, maxPage: number) => {
  let startPage = Math.max(1, currPage - 1);
  const endPage = Math.min(maxPage, startPage + PAGINATION_VISIBLE_BUTTONS - 1);

  if (endPage - startPage + 1 < PAGINATION_VISIBLE_BUTTONS) {
    startPage = Math.max(1, endPage - PAGINATION_VISIBLE_BUTTONS + 1);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
};

export const parsePaginationParams = (
  page: unknown,
  perPage: unknown,
  defaultPerPage: number
): PaginationParams => {
  const parsedPage = parseStringToNumber(page);
  const parsedPerPage = parseStringToNumber(perPage);

  return {
    page: parsedPage ?? 1,
    perPage: parsedPerPage ?? defaultPerPage,
  };
};

export const parseStringToNumber = (unknown: unknown) => {
  if (typeof unknown !== "string") {
    return undefined;
  }

  const number = parseInt(unknown, 10);

  return isNaN(number) ? undefined : number;
};

export const parseFilterParams = (category: unknown, name: unknown) => {
  let parsedCategory = null;
  let parsedName = null;

  if (category && typeof category === "string") {
    parsedCategory = productCategory
      .map((product) => product.name)
      .includes(category)
      ? category
      : null;
  }

  if (name && typeof name === "string") {
    parsedName = name;
  }

  return {
    name: parsedName,
    category: parsedCategory,
  };
};

export const slicePathname = (pathname: string) => {
  const endIndex = pathname.slice(1).indexOf("/");

  return endIndex === -1 ? pathname : pathname.slice(0, endIndex + 1);
};

export const formatDate = (date: Date) => {
  const currDate = new Date();
  const dateDiff = Math.floor(
    (currDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (dateDiff === 0) return "today";
  if (dateDiff === 1) return "yesterday";
  if (dateDiff < 31) return `${dateDiff} days ago`;

  const months = Math.floor(dateDiff / 30.44);
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(dateDiff / 365.25);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
};

export const convertToPlainObject = <T>(object: T): T => {
  return JSON.parse(JSON.stringify(object));
};

export const calcCartPrice = (cart: Cart, products: (Product | null)[]) => {
  return cart.CartItems.reduce((acc, item) => {
    const price = products.find(
      (product) => product?.id === item.productId
    )?.price;
    return acc + item.quantity * (price ?? 1);
  }, 0).toFixed(2);
};
