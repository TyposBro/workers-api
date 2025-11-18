// src/features/user/presentation/user.controller.ts
import { injectable } from "tsyringe";
import { CreateUserUseCase } from "../application/usecases/create-user.usecase";
import { GetUserByIdUseCase } from "../application/usecases/get-user-by-id.usecase";
import type { CreateUserCommand } from "../application/usecases/create-user.usecase";
import { HonoContext } from "../../../core/types/hono.types";

@injectable()
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase
  ) {}

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

  public getById = async (c: HonoContext) => {
    try {
      const userId = c.req.param("id");
      const user = await this.getUserByIdUseCase.execute(userId);
      return c.json({ data: user });
    } catch (error) {
      throw error;
    }
  };
}
