import { Model } from "sequelize";

export class ProfessorModel extends Model {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
}
