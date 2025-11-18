// src/features/user/presentation/user.routes.ts
import { Hono } from "hono";
import { UserController } from "./user.controller";
import { HonoContext } from "../../../core/types/hono.types";

export const userRoutes = new Hono<HonoContext>();

// This function resolves the controller from the request-scoped container
const resolveController = (c: HonoContext) => c.get("container").resolve(UserController);

userRoutes.post("/", (c) => resolveController(c).create(c));
// userRoutes.get('/:id', (c) => resolveController(c).getById(c));
