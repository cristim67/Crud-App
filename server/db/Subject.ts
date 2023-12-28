import { Model } from "sequelize";

export class SubjectModel extends Model {
  id!: string;
  subjectName!: string;
  subjectDescription!: string;
  professorId!: string;
  createdAt?: Date;
}

export type SubjectType = {
  id: string;
  subjectName?: string;
  subjectDescription?: string;
  professorId?: string;
  createdAt?: Date;
}