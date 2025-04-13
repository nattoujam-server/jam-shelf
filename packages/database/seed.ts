import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

const createSkuRecords = async () => {
  const sku1 = "石鹸";
  await prisma.sku.upsert({
    where: { name: sku1 },
    update: {},
    create: {
      name: sku1,
      stock: 10,
      unit: "個",
    },
  });

  const sku2 = "塩";
  await prisma.sku.upsert({
    where: { name: sku2 },
    update: {},
    create: {
      name: sku2,
      stock: 2,
      unit: "袋",
      warnThreshold: 2,
    },
  });

  const sku3 = "砂糖";
  await prisma.sku.upsert({
    where: { name: sku3 },
    update: {},
    create: {
      name: sku3,
      stock: 2,
      unit: "袋",
      warnThreshold: 3,
      dangerThreshold: 2,
    },
  });
};

const main = async () => {
  await createSkuRecords();
};

try {
  main();
} catch (e) {
  console.error(e);
} finally {
  prisma.$disconnect();
}
