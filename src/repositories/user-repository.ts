import type { Role } from "../generated/prisma/enums.js";
import prisma from "../prisma/prisma.js";

interface CreateUserInput {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
}

class UserRepository {
  async create(data: CreateUserInput) {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}

export default new UserRepository();
