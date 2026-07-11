import AppError from "../errors/app-error.js";
import StudentRepository from "../repositories/student-repositories.js";
import {
  createStudentSchema,
  type CreateStudentInput,
} from "../validators/student-validator.js";

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

  async findAll() {
    const students = await StudentRepository.findAll();

    return students;
  }

  async findById(id: string) {
    const student = await StudentRepository.findById(id);

    if (!student) {
      throw new AppError("Student not found.", 404);
    }

    return student;
  }
}

export default new StudentService();
