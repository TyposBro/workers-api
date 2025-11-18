// import { Hono } from "hono";

// const app = new Hono<{ Bindings: CloudflareBindings }>();

// app.get("/message", (c) => {
//   return c.text("Hello Hono!");
// });

// export default app;

// src/index.ts

// THIS MUST BE THE FIRST IMPORT
import "reflect-metadata";

import { Hono } from "hono";
import { container } from "tsyringe";
import { HonoContext } from "./core/types/hono.types";
import { registerUserDependencies } from "./features/user/di";
import { userRoutes } from "./features/user/presentation/user.routes";
import { globalErrorHandler } from "./core/middleware/error-handler";

// --- Create the Hono App ---
const app = new Hono<HonoContext>();

// --- DI Container Setup Middleware ---
// This middleware creates a request-scoped DI container.
// It's crucial for serverless environments to avoid state pollution between requests.
app.use("*", async (c, next) => {
  // Create a child container for each request
  const requestContainer = container.createChildContainer();

  // Make Cloudflare bindings available for injection
  requestContainer.register<Env["DB"]>("D1Binding", { useValue: c.env.DB });

  // Register all feature dependencies
  registerUserDependencies(requestContainer);

  // Store the container on the context
  c.set("container", requestContainer);

  await next();
});

// --- Middleware ---
app.use("*", globalErrorHandler);

// --- Route Registration ---
app.route("/users", userRoutes);

// --- Health Check Route ---
app.get("/", (c) => c.text("API is healthy!"));

export default app;
