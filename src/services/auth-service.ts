import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Role } from "../generated/prisma/enums.js";
import AppError from "../errors/app-error.js";
import UserRepository from "../repositories/user-repositories.js";
import {
  signInSchema,
  signUpSchema,
  type SignInInput,
  type SignUpInput,
} from "../validators/auth-validator.js";
import { env } from "../config/env.js";

class AuthService {
  async signUp(data: SignUpInput) {
    const parsedData = signUpSchema.parse(data);

    const registeredUser = await UserRepository.findByEmail(parsedData.email);

    if (registeredUser) {
      throw new AppError("Email already registered.", 409);
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(parsedData.password, salt);

    const createUserData = {
      name: parsedData.name,
      email: parsedData.email,
      passwordHash,
      role: Role.MANAGER,
    };

    const user = await UserRepository.create(createUserData);

    const publicUserData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return publicUserData;
  }

  async signIn(data: SignInInput) {
    const parsedData = signInSchema.parse(data);

    const user = await UserRepository.findByEmail(parsedData.email);

    if (!user) {
      throw new AppError("Invalid credentials.", 401);
    }

    const isValidPassword = await bcrypt.compare(
      parsedData.password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      throw new AppError("Invalid credentials.", 401);
    }

    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return {
      user: sessionData,
      token,
    };
  }
}

export default new AuthService();
