// src/core/middleware/error-handler.ts
import { MiddlewareHandler } from "hono";
import { ApiError } from "../errors/api-error";

export const globalErrorHandler: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ApiError) {
      return c.json({ message: err.message }, err.statusCode);
    }
    console.error(err); // Good for debugging
    return c.json({ message: "Internal Server Error" }, 500);
  }
};
