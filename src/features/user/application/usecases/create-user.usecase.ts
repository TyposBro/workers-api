// src/features/user/application/use-cases/create-user.usecase.ts
import { inject, injectable } from "tsyringe";
import { User } from "../../domain/user.entity";
import { IUserRepository, IUserRepositoryToken } from "../interfaces/user.repository";
import { ApiError } from "../../../../core/errors/api-error";

export interface CreateUserCommand {
  name: string;
  email: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository
  ) {}

  public async execute({ name, email }: CreateUserCommand): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(409, `User with email ${email} already exists.`);
    }

    const newUser = await this.userRepository.create({ name, email });
    return newUser;
  }
}
