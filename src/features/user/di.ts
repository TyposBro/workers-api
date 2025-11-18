// src/features/user/di.ts
import { DependencyContainer } from "tsyringe";
import { IUserRepositoryToken } from "./application/interfaces/user.repository";
import { D1UserRepository } from "./infrastructure/d1-user.repository";
import { CreateUserUseCase } from "./application/usecases/create-user.use-case";
import { UserController } from "./presentation/user.controller";

export const registerUserDependencies = (container: DependencyContainer) => {
  // Register the repository (port -> adapter)
  container.register(IUserRepositoryToken, { useClass: D1UserRepository });

  // Register use cases
  container.register(CreateUserUseCase, { useClass: CreateUserUseCase });

  // Register controller
  container.register(UserController, { useClass: UserController });
};
