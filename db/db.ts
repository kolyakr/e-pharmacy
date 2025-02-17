import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      customer: {
        create({ args, query }) {
          if (args.data?.spent && typeof args.data.spent === "string") {
            args.data.spent = new Decimal(args.data.spent.replace(",", ""));
          }
          return query(args);
        },
        update({ args, query }) {
          if (args.data?.spent && typeof args.data.spent === "string") {
            args.data.spent = new Decimal(args.data.spent.replace(",", ""));
          }
          return query(args);
        },
      },
      supplier: {
        create({ args, query }) {
          if (args.data?.amount && typeof args.data.amount === "string") {
            args.data.amount = new Decimal(
              args.data.amount.replace(/[^0-9.]/g, "")
            );
          }
          if (args.data?.date && typeof args.data.date === "string") {
            args.data.date = new Date(args.data.date);
          }
          return query(args);
        },
        update({ args, query }) {
          if (args.data?.amount && typeof args.data.amount === "string") {
            args.data.amount = new Decimal(
              args.data.amount.replace(/[^0-9.]/g, "")
            );
          }
          if (args.data?.date && typeof args.data.date === "string") {
            args.data.date = new Date(args.data.date);
          }
          return query(args);
        },
      },
      order: {
        create({ args, query }) {
          if (args.data?.price && typeof args.data.price === "string") {
            args.data.price = new Decimal(
              args.data.price.replace(/[^0-9.]/g, "")
            );
          }
          if (
            args.data?.order_date &&
            typeof args.data.order_date === "string"
          ) {
            args.data.order_date = new Date(args.data.order_date);
          }
          if (args.data?.products && typeof args.data.products === "string") {
            args.data.products = parseInt(args.data.products, 10) || 0;
          }
          return query(args);
        },
        update({ args, query }) {
          if (args.data?.price && typeof args.data.price === "string") {
            args.data.price = new Decimal(
              args.data.price.replace(/[^0-9.]/g, "")
            );
          }
          if (
            args.data?.order_date &&
            typeof args.data.order_date === "string"
          ) {
            args.data.order_date = new Date(args.data.order_date);
          }
          if (args.data?.products && typeof args.data.products === "string") {
            args.data.products = parseInt(args.data.products, 10) || 0;
          }
          return query(args);
        },
      },
      product: {
        create({ args, query }) {
          if (args.data?.price && typeof args.data.price === "string") {
            args.data.price = new Decimal(
              args.data.price.replace(/[^0-9.]/g, "")
            );
          }
          if (args.data?.stock && typeof args.data.stock === "string") {
            args.data.stock = parseInt(args.data.stock, 10) || 0;
          }
          return query(args);
        },
        update({ args, query }) {
          if (args.data?.price && typeof args.data.price === "string") {
            args.data.price = new Decimal(
              args.data.price.replace(/[^0-9.]/g, "")
            );
          }
          if (args.data?.stock && typeof args.data.stock === "string") {
            args.data.stock = parseInt(args.data.stock, 10) || 0;
          }
          return query(args);
        },
      },
    },
    result: {
      product: {
        price: {
          needs: { price: true },
          compute(product) {
            return Number(product.price);
          },
        },
      },
    },
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
