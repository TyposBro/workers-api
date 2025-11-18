// src/features/user/application/interfaces/user.repository.ts
import { User } from "../../domain/user.entity";

// We use an interface for the contract and a token for DI
export const IUserRepositoryToken = Symbol("IUserRepository");

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, "id" | "createdAt">): Promise<User>;
}
