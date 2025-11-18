// src/core/errors/api-error.ts
import type { ContentfulStatusCode } from "hono/utils/http-status";

export class ApiError extends Error {
  constructor(public readonly statusCode: ContentfulStatusCode, message: string) {
    super(message);
  }
}
