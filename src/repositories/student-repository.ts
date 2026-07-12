import { StudentStatus } from "../generated/prisma/enums.js";
import prisma from "../prisma/prisma.js";

interface CreateStudentRepositoryInput {
  name: string;
  email: string;
  phone?: string;
  document: string;
  birthDate: Date;
}

interface UpdateStudentRepositoryInput {
  name?: string;
  email?: string;
  phone?: string;
  birthDate?: Date;
}

export interface FindStudentsFilters {
  status?: StudentStatus;
  search?: string;
}

class StudentRepository {
  async create(data: CreateStudentRepositoryInput) {
    return prisma.student.create({
      data,
    });
  }

  async findAll({ search, status }: FindStudentsFilters) {
    return prisma.student.findMany({
      where: {
        ...(status && { status }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { document: { contains: search } },
            { phone: { contains: search } },
          ],
        }),
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.student.findUnique({
      where: { id },
    });
  }

  async updateStudent(id: string, data: UpdateStudentRepositoryInput) {
    return prisma.student.update({
      where: { id },
      data,
    });
  }

  async updateStudentStatus(id: string, status: StudentStatus) {
    return prisma.student.update({
      where: { id },
      data: { status },
    });
  }

  // Métodos auxiliares.
  async findByEmail(email: string) {
    return prisma.student.findUnique({
      where: { email },
    });
  }

  async findByDocument(document: string) {
    return prisma.student.findUnique({
      where: { document },
    });
  }

  async findByPhone(phone: string) {
    return prisma.student.findUnique({
      where: { phone },
    });
  }
}

export default new StudentRepository();
