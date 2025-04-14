import { z } from "@hono/zod-openapi";

/**
 * read
 */
export const SkuSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: "石鹸" }),
    stock: z.number().min(0).openapi({ example: 10 }),
    unit: z.string().openapi({ example: "個" }),
    warnThreshold: z.number().min(1).openapi({ example: 3 }),
    dangerThreshold: z.number().min(0).openapi({ example: 1 }),
  })
  .openapi("SkuSchema");

export const SkuListSchema = z.array(SkuSchema).openapi("SkuListSchema");

/**
 * create
 */
export const CreateSkuRequestSchema = z
  .object({
    name: z.string().openapi({ example: "醤油" }),
    stock: z.number().min(0).openapi({ example: 3 }),
    unit: z.string().openapi({ example: "本" }),
    warnThreshold: z.number().min(1).openapi({ example: 2 }),
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
  .openapi("CreateSkuRequestSchema");

/**
 * update
 */
export const UpdateSkuParamSchema = z
  .object({
    skuId: z.string().openapi({ example: "1" }),
  })
  .openapi("UpdateSkuParamSchema");

export const UpdateSkuRequestSchema = z
  .object({
    name: z.string().openapi({ example: "塩" }),
    stock: z.number().min(0).openapi({ example: 5 }),
    unit: z.string().openapi({ example: "袋" }),
    warnThreshold: z.number().min(1).openapi({ example: 4 }),
    dangerThreshold: z.number().min(0).openapi({ example: 2 }),
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
  .openapi("UpdateSkuRequestSchema");

/**
 * delete
 */
export const DeleteSkuParamSchema = z
  .object({
    skuId: z.string().openapi({ example: "1" }),
  })
  .openapi("DeleteSkuParamSchema");
