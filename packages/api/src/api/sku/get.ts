import { createRoute } from "@hono/zod-openapi";

import { ErrorResponse } from "@/models/error";
import { SkuListSchema } from "@/models/sku";

export const getSkuRoute = createRoute({
  path: "/",
  method: "get",
  description: "SKUの一覧取得",
  request: {},
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: SkuListSchema,
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
