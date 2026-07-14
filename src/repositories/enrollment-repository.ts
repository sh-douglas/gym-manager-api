import { EnrollmentStatus, type Prisma } from "../generated/prisma/client.js";
import prisma from "../prisma/prisma.js";

interface CreateEnrollmentRepositoryInput {
  studentId: string;
  planId: string;
  startDate: Date;
  endDate: Date;
  contractedPrice: Prisma.Decimal;
}

class EnrollmentRepository {
  async create(data: CreateEnrollmentRepositoryInput) {
    return prisma.enrollment.create({
      data,
    });
  }

  async findActiveByStudentId(studentId: string) {
    return prisma.enrollment.findFirst({
      where: {
        studentId,
        status: EnrollmentStatus.ACTIVE,
      },
    });
  }
}

export default new EnrollmentRepository();
