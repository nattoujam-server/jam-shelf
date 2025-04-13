import { z } from "@hono/zod-openapi";

export const SkuSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: "石鹸" }),
    stock: z.number().min(0).openapi({ example: 10 }),
    unit: z.string().openapi({ example: "個" }),
    warnThreshold: z.number().min(1).openapi({ example: 3 }),
    dangerThreshold: z.number().min(0).openapi({ example: 1 }),
  })
  .refine(
    (args) => {
      const { warnThreshold, dangerThreshold } = args;
      return warnThreshold > dangerThreshold;
    },
    {
      message: "注意の閾値は警告の閾値より大きくしてください",
      path: ["warnThreshold"],
    }
  )
  .openapi("SkuSchema");

export const SkuListSchema = z.array(SkuSchema).openapi("SkuListSchema");
