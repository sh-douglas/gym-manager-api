import AppError from "../errors/app-error.js";
import StudentRepository from "../repositories/student-repositories.js";
import {
  createStudentSchema,
  type CreateStudentInput,
  updateStudentSchema,
  type UpdateStudentInput,
  updateStudentStatusSchema,
  type UpdateStudentStatusInput,
  listStudentsQuerySchema,
  // type ListStudentQueryInput,
} from "../validators/student-validator.js";

import type { FindStudentsFilters } from "../repositories/student-repositories.js";

class StudentService {
  async create(data: CreateStudentInput) {
    const parsedData = createStudentSchema.parse(data);
    const normalizedEmail = parsedData.email.toLowerCase();
    const studentByEmail = await StudentRepository.findByEmail(normalizedEmail);

    if (studentByEmail) {
      throw new AppError("Email already registered.", 409);
    }

    const studentByDocument = await StudentRepository.findByDocument(
      parsedData.document,
    );

    if (studentByDocument) {
      throw new AppError("Document already registered.", 409);
    }

    if (parsedData.phone) {
      const studentByPhone = await StudentRepository.findByPhone(
        parsedData.phone,
      );

      if (studentByPhone) {
        throw new AppError("Phone already registered.", 409);
      }
    }

    const parsedBirthDate: Date = new Date(parsedData.birthDate);

    const newStudentData = {
      name: parsedData.name,
      email: normalizedEmail,
      ...(parsedData.phone && { phone: parsedData.phone }),
      document: parsedData.document,
      birthDate: parsedBirthDate,
    };

    const createdStudent = await StudentRepository.create(newStudentData);

    return createdStudent;
  }

  async findAll(query: unknown) {
    const parsedQuery = listStudentsQuerySchema.parse(query);

    const filters: FindStudentsFilters = {
      ...(parsedQuery.status !== undefined && {
        status: parsedQuery.status,
      }),
      ...(parsedQuery.search !== undefined && {
        search: parsedQuery.search,
      }),
    };

    const students = await StudentRepository.findAll(filters);

    return students;
  }

  async findById(id: string) {
    const student = await StudentRepository.findById(id);

    if (!student) {
      throw new AppError("Student not found.", 404);
    }

    return student;
  }

  async updateStudent(id: string, data: UpdateStudentInput) {
    const parsedData = updateStudentSchema.parse(data);
    let normalizedEmail: string | undefined;

    const student = await StudentRepository.findById(id);

    if (!student) {
      throw new AppError("Student not found.", 404);
    }

    if (parsedData.email) {
      normalizedEmail = parsedData.email.toLowerCase();
      const registeredStudent =
        await StudentRepository.findByEmail(normalizedEmail);
      if (registeredStudent && registeredStudent.id !== id) {
        throw new AppError("Email already registered.", 409);
      }
    }

    if (parsedData.phone) {
      const registeredStudent = await StudentRepository.findByPhone(
        parsedData.phone,
      );
      if (registeredStudent && registeredStudent.id !== id) {
        throw new AppError("Phone already registered.", 409);
      }
    }

    const parsedBirthDate = parsedData.birthDate
      ? new Date(parsedData.birthDate)
      : undefined;

    const updateStudentData = {
      ...(parsedData.name && { name: parsedData.name }),
      ...(normalizedEmail && { email: normalizedEmail }),
      ...(parsedData.phone && { phone: parsedData.phone }),
      ...(parsedBirthDate && { birthDate: parsedBirthDate }),
    };

    const updatedStudent = await StudentRepository.updateStudent(
      id,
      updateStudentData,
    );

    return updatedStudent;
  }

  async updateStudentStatus(id: string, status: UpdateStudentStatusInput) {
    const parsedData = updateStudentStatusSchema.parse(status);

    const student = await StudentRepository.findById(id);

    if (!student) {
      throw new AppError("Student not found.", 404);
    }

    const updatedStudentStatus = await StudentRepository.updateStudentStatus(
      id,
      parsedData.status,
    );

    return updatedStudentStatus;
  }
}

export default new StudentService();
