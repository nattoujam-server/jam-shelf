import { createRoute } from "@hono/zod-openapi";

import { ErrorResponse } from "@/models/error";
import { SkuSchema, CreateSkuRequestSchema } from "@/models/sku";

export const createSkuRoute = createRoute({
  path: "/",
  method: "post",
  description: "SKUの新規作成",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateSkuRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: SkuSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
    },
  },
});
