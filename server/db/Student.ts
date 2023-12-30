import { Model } from "sequelize";

export class StudentModel extends Model {
  id!: string;
  firstName!: string;
  lastName!: string;
  birthDate!: Date;
  address!: string;
  email!: string;
  phone!: string;
  createdAt!: Date;
}

export type StudentType = {
  id: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  address?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
};
