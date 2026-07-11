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

class StudentRepository {
  async create(data: CreateStudentRepositoryInput) {
    return prisma.student.create({
      data,
    });
  }

  async findAll() {
    return prisma.student.findMany();
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
