import { Model } from "sequelize";

export class RegisterStudentSubjectModel extends Model {
  id!: string;
  studentId!: string;
  subjectId!: string;
  grade!: number;
  dateRegistered!: Date;
  createdAt!: Date;
}

export type RegisterStudentSubjectType = {
  id: string;
  studentId?: string;
  subjectId?: string;
  grade?: number;
  dateRegistered?: Date;
  createdAt?: Date;
}