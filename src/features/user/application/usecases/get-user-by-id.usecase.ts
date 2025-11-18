// src/features/user/application/use-cases/get-user-by-id.usecase.ts
import { inject, injectable } from "tsyringe";
import { User } from "../../domain/user.entity";
import { IUserRepository, IUserRepositoryToken } from "../interfaces/user.repository";
import { ApiError } from "../../../../core/errors/api-error";

@injectable()
export class GetUserByIdUseCase {
  constructor(
    @inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ApiError(404, `User with ID ${userId} not found.`);
    }
    return user;
  }
}
