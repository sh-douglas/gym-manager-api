import AppError from "../errors/app-error.js";
import { EnrollmentStatus } from "../generated/prisma/enums.js";
import EnrollmentRepository from "../repositories/enrollment-repository.js";
import PlanRepository from "../repositories/plan-repository.js";
import StudentRepository from "../repositories/student-repository.js";
import {
  createEnrollmentSchema,
  type CreateEnrollmentInput,
} from "../validators/enrollment-validator.js";

class EnrollmentService {
  async create(data: CreateEnrollmentInput) {
    const parsedData = createEnrollmentSchema.parse(data);

    const registeredStudent = await StudentRepository.findById(
      parsedData.studentId,
    );

    if (!registeredStudent) {
      throw new AppError("Student not found.", 404);
    }

    const activeEnrollment = await EnrollmentRepository.findActiveByStudentId(
      parsedData.studentId,
    );

    if (activeEnrollment) {
      throw new AppError("Student already has an active enrollment.", 409);
    }

    if (registeredStudent.status === "BLOCKED") {
      throw new AppError("This student is not allowed.", 409);
    }

    const plan = await PlanRepository.findById(parsedData.planId);

    if (!plan) {
      throw new AppError("Plan not found.", 404);
    }

    if (plan.isActive === false) {
      throw new AppError("Plan is not active.", 409);
    }

    const startDate = new Date(`${parsedData.startDate}T00:00:00.000Z`);

    const endDate = new Date(startDate);

    const originalDay = endDate.getUTCDate();

    endDate.setUTCDate(1);
    endDate.setUTCMonth(endDate.getUTCMonth() + plan.durationInMonths);

    const lastDayOfTargetMonth = new Date(
      Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth() + 1, 0),
    ).getUTCDate();

    endDate.setUTCDate(Math.min(originalDay, lastDayOfTargetMonth));

    const enrollment = await EnrollmentRepository.create({
      studentId: parsedData.studentId,
      planId: parsedData.planId,
      startDate,
      endDate,
      contractedPrice: plan.price,
    });

    return enrollment;
  }

  async findAll() {
    const enrollments = await EnrollmentRepository.findAll();

    return enrollments;
  }

  async findById(id: string) {
    const enrollment = await EnrollmentRepository.findById(id);

    if (!enrollment) {
      throw new AppError("Enrollment not found.", 404);
    }

    return enrollment;
  }

  async cancel(id: string) {
    const enrollment = await EnrollmentRepository.findById(id);

    if (!enrollment) {
      throw new AppError("Enrollment not found.", 404);
    }

    if (enrollment.status === "CANCELED") {
      throw new AppError("This enrollment has already been canceled.", 409);
    }

    if (enrollment.status === "EXPIRED") {
      throw new AppError(
        "It is not possible to change the status of expired enrollments.",
        409,
      );
    }

    const canceledEnrollment = await EnrollmentRepository.updateStatus(
      id,
      EnrollmentStatus.CANCELED,
    );

    return canceledEnrollment;
  }

  async suspend(id: string) {
    const enrollment = await EnrollmentRepository.findById(id);

    if (!enrollment) {
      throw new AppError("Enrollment not found.", 404);
    }

    if (enrollment.status !== "ACTIVE") {
      throw new AppError("Only active enrollments can be suspended.", 409);
    }

    const suspendedEnrollment = await EnrollmentRepository.updateStatus(
      id,
      EnrollmentStatus.SUSPENDED,
    );

    return suspendedEnrollment;
  }

  async reactivate(id: string) {
    const enrollment = await EnrollmentRepository.findById(id);

    if (!enrollment) {
      throw new AppError("Enrollment not found.", 404);
    }

    if (enrollment.status !== "SUSPENDED") {
      throw new AppError("This enrollment cannot be reactivated.", 409);
    }

    const enrollmentActive = await EnrollmentRepository.findActiveByStudentId(
      enrollment.studentId,
    );

    if (enrollmentActive) {
      throw new AppError("Student already has another active enrollment.", 409);
    }

    const reactivatedEnrollment = await EnrollmentRepository.updateStatus(
      id,
      EnrollmentStatus.ACTIVE,
    );

    return reactivatedEnrollment;
  }
}

export default new EnrollmentService();
