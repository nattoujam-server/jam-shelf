import { OpenAPIHono, z } from "@hono/zod-openapi";
import { PrismaClient } from "@database/generated/prisma";

import { SkuSchema } from "@/models/sku";
import { getSkuRoute } from "@/api/sku/get";

export const skuApi = new OpenAPIHono();

const prisma = new PrismaClient();

type SkuData = z.infer<typeof SkuSchema>;

skuApi.openapi(getSkuRoute, async (c) => {
  try {
    const skuList: Array<SkuData> = await prisma.sku.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return c.json(skuList, 200);
  } catch (e) {
    console.error(e);
    return c.json({ message: "Internal Server Error", stackTrace: e }, 500);
  }
});
