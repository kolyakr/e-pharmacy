import { suppliers as rawSuppliers } from "./data/suppliers";
import { incomeExpenses as rawIncomeExpenses } from "./data/Income-Expenses";
import { pharmacies } from "./data/pharmacies";
import { products as rawProducts } from "./data/products";
import prisma from "./db";
import { Decimal } from "@prisma/client/runtime/library";

async function main() {
  try {
    // Очищення бази
    await prisma.incomeExpense.deleteMany();
    await prisma.pharmacy.deleteMany();
    await prisma.product.deleteMany();
    await prisma.supplier.deleteMany();

    // Обробка даних
    const incomeExpenses = rawIncomeExpenses.map((item) => ({
      ...item,
      amount: new Decimal(item.amount.replace(/,/g, "").replace("+", "")),
    }));

    const suppliers = rawSuppliers.map((supplier) => ({
      ...supplier,
      amount: new Decimal(supplier.amount.replace(/[^\d.]/g, "")),
      date: new Date(supplier.date),
    }));

    // Видаляємо `id`, щоб Prisma сам генерував унікальні значення
    const products = rawProducts.map(({ id, ...product }) => ({
      ...product,
      stock: parseInt(product.stock, 10),
      price: new Decimal(product.price),
    }));

    // Вставка даних
    await prisma.incomeExpense.createMany({ data: incomeExpenses });
    await prisma.pharmacy.createMany({ data: pharmacies });
    await prisma.supplier.createMany({ data: suppliers });
    await prisma.product.createMany({ data: products });

    console.log("✅ Seed data inserted successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
