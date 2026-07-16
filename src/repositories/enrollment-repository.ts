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

  async findAll() {
    return prisma.enrollment.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        plan: {
          select: {
            id: true,
            name: true,
            price: true,
            durationInMonths: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.enrollment.findUnique({
      where: {
        id,
      },
    });
  }

  async updateStatus(id: string, status: EnrollmentStatus) {
    return prisma.enrollment.update({
      where: { id },
      data: { status },
    });
  }
}

export default new EnrollmentRepository();
