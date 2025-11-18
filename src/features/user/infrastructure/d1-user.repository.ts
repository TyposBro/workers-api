// src/features/user/infrastructure/d1-user.repository.ts
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../application/interfaces/user.repository";
import { User } from "../domain/user.entity";

@injectable()
export class D1UserRepository implements IUserRepository {
  constructor(@inject("D1Binding") private readonly db: D1Database) {}

  async findById(id: string): Promise<User | null> {
    const stmt = this.db.prepare("SELECT * FROM users WHERE id = ?").bind(id);
    const result = await stmt.first<User>();
    return result
      ? new User(result.id, result.email, result.name, new Date(result.createdAt))
      : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const stmt = this.db.prepare("SELECT * FROM users WHERE email = ?").bind(email);
    const result = await stmt.first<User>();
    return result
      ? new User(result.id, result.email, result.name, new Date(result.createdAt))
      : null;
  }

  async create(userData: Omit<User, "id" | "createdAt">): Promise<User> {
    const id = crypto.randomUUID();
    const createdAt = new Date();

    const stmt = this.db
      .prepare("INSERT INTO users (id, email, name, createdAt) VALUES (?, ?, ?, ?) RETURNING *")
      .bind(id, userData.email, userData.name, createdAt.toISOString());

    const result = await stmt.first<User>();

    if (!result) {
      throw new Error("Failed to create user");
    }

    return new User(result.id, result.email, result.name, new Date(result.createdAt));
  }
}
