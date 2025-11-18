// src/features/user/presentation/user.controller.ts
import { injectable } from "tsyringe";
import { CreateUserUseCase } from "../application/usecases/create-user.use-case";
import type { CreateUserCommand } from "../application/usecases/create-user.use-case";
import { HonoContext } from "../../../core/types/hono.types";

@injectable()
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  public create = async (c: HonoContext) => {
    try {
      const body = await c.req.json<CreateUserCommand>();
      const user = await this.createUserUseCase.execute({ name: body.name, email: body.email });
      return c.json({ data: user }, 201);
    } catch (error) {
      // Error will be caught by the global error handler
      throw error;
    }
  };

  // public getById = async (c: Context) => { ... }
}
