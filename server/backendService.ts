import { GenezioDeploy } from "@genezio/types";
import { Sequelize, DataTypes } from "sequelize";
import { StudentModel, StudentType } from "./db/Student";
import { SubjectModel, SubjectType } from "./db/Subject";
import { ProfessorModel, ProfessorType } from "./db/Professor";
import {
  RegisterStudentSubjectModel,
  RegisterStudentSubjectType,
} from "./db/RegisterStudentSubject";
import * as pg from "pg";

@GenezioDeploy()
export class BackendService {
  sequelize: Sequelize | undefined;

  /**
   * The constructor of the class.
   * It will initialize the connection to the database.
   * @constructor
   */
  constructor() {
    if (process.env.POSTGRESQL_URL == null) {
      console.error("Error: POSTGRESQL_URL is not defined");
      return;
    }
    this.sequelize = new Sequelize(process.env.POSTGRESQL_URL, {
      dialect: "postgres",
      define: {
        timestamps: false,
      },
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
        },
      },
      dialectModule: pg.Client,
    });

    this.#connect();

    StudentModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        birthDate: DataTypes.DATE,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        createdAt: DataTypes.DATE,
      },
      {
        sequelize: this.sequelize,
        tableName: "students",
      },
    );

    SubjectModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        subjectName: DataTypes.STRING,
        subjectDescription: DataTypes.STRING,
        professorId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
      },
      {
        sequelize: this.sequelize,
        tableName: "subjects",
      },
    );

    ProfessorModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        createdAt: DataTypes.DATE,
      },
      {
        sequelize: this.sequelize,
        tableName: "professors",
      },
    );

    RegisterStudentSubjectModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        studentId: DataTypes.STRING,
        subjectId: DataTypes.STRING,
        grade: DataTypes.INTEGER,
        dateRegistered: DataTypes.DATE,
        createdAt: DataTypes.DATE,
      },
      {
        sequelize: this.sequelize,
        tableName: "registerStudentSubject",
      },
    );
  }

  /**
   * Private method used to connect to the DB.
   */
  async #connect() {
    console.log("Connecting to the database");
    const connect = await this.sequelize?.sync().catch((error) => {
      console.error(error);
      return null;
    });

    if (connect == null) {
      console.error("Error connecting to the database");
      return;
    } else {
      console.log("Connected to the database");
    }
  }

  /**
   * Method that can be used to create a new user.
   * @param {string} firstName The student's first name.
   * @param {string} lastName The student's last name.
   * @param {string} birthDate The student's email.
   * @param {string} address The student's address.
   * @param {string} email The student's email.
   * @param {string} phone The student's phone.
   * @returns {Promise<boolean>} A boolean that is true if the creation was successfull, false otherwise.
   */
  async createStudent(
    firstName: string,
    lastName: string,
    birthDate: Date,
    address: string,
    email: string,
    phone: string,
  ): Promise<boolean> {
    const student = await StudentModel.create({
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      address: address,
      email: email,
      phone: phone,
      createdAt: new Date(),
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return student != null;
  }

  /**
   * Method that can be used to create a new user.
   * @param {string} subjectName The subject's name.
   * @param {string} subjectDescription The subject's description.
   * @param {string} professorId The subject's professor id.
   * @returns {Promise<boolean>} A boolean that is true if the creation was successfull, false otherwise.
   */
  async createSubject(
    subjectName: string,
    subjectDescription: string,
    professorId: string,
  ): Promise<boolean> {
    const subject = await SubjectModel.create({
      subjectName: subjectName,
      subjectDescription: subjectDescription,
      professorId: professorId,
      createdAt: new Date(),
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return subject != null;
  }

  /**
   * Method that can be used to create a new user.
   * @param {string} firstName The professor's first name.
   * @param {string} lastName The professor's last name.
   * @param {string} email The professor's email.
   * @returns {Promise<boolean>} A boolean that is true if the creation was successfull, false otherwise.
   */
  async createProfessor(
    firstName: string,
    lastName: string,
    email: string,
  ): Promise<boolean> {
    const professor = await ProfessorModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdAt: new Date(),
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return professor != null;
  }

  /**
   * Method that can be used to create a new user.
   * @param {string} studentId The registerStudentSubject's student id.
   * @param {string} subjectId The registerStudentSubject's subject id.
   * @param {string} grade The registerStudentSubject's grade.
   * @param {string} dateRegistered The registerStudentSubject's date registered.
   * @returns {Promise<boolean>} A boolean that is true if the creation was successfull, false otherwise.
   */

  async createRegisterStudentSubject(
    studentId: string,
    subjectId: string,
    grade: number,
    dateRegistered: Date,
  ): Promise<boolean> {
    const registerStudentSubject = await RegisterStudentSubjectModel.create({
      studentId: studentId,
      subjectId: subjectId,
      grade: grade,
      dateRegistered: dateRegistered,
      createdAt: new Date(),
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return registerStudentSubject != null;
  }

  /**
   * Method that can be used to get all the students.
   * @returns {Promise<StudentType[]>} An array of students.
   */
  async getStudents(): Promise<StudentType[]> {
    const students = await StudentModel.findAll({
      order: [["createdAt", "DESC"]],
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return students || [];
  }

  /**
   * Method that can be used to get all the subjects.
   * @returns {Promise<SubjectType[]>} An array of subjects.
   */
  async getSubjects(): Promise<SubjectType[]> {
    const subjects = await SubjectModel.findAll().catch((error) => {
      console.error(error);
      return null;
    });

    return subjects || [];
  }

  /**
   * Method that can be used to get all the professors.
   * @returns {Promise<ProfessorType[]>} An array of professors.
   */
  async getProfessors(): Promise<ProfessorType[]> {
    const professors = await ProfessorModel.findAll().catch((error) => {
      console.error(error);
      return null;
    });

    return professors || [];
  }

  /**
   * Method that can be used to get all the registerStudentSubject.
   * @returns {Promise<RegisterStudentSubjectType[]>} An array of registerStudentSubject.
   */
  async getRegisterStudentSubject(): Promise<RegisterStudentSubjectType[]> {
    const registerStudentSubject =
      await RegisterStudentSubjectModel.findAll().catch((error) => {
        console.error(error);
        return null;
      });

    return registerStudentSubject || [];
  }

  /**
   * Method that can be used to delete a student.
   * @param id
   * @returns {Promise<boolean>} A boolean that is true if the deletion was successfull, false otherwise.
   */
  async deleteStudent(id: string): Promise<boolean> {
    const student = await StudentModel.destroy({
      where: {
        id: id,
      },
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return student != null;
  }

  /**
   * Method that can be used to delete a subject.
   * @param id
   * @returns {Promise<boolean>} A boolean that is true if the deletion was successfull, false otherwise.
   */
  async deleteSubject(id: string): Promise<boolean> {
    const subject = await SubjectModel.destroy({
      where: {
        id: id,
      },
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return subject != null;
  }

  /**
   * Method that can be used to delete a professor.
   * @param id
   * @returns {Promise<boolean>} A boolean that is true if the deletion was successfull, false otherwise.
   */
  async deleteProfessor(id: string): Promise<boolean> {
    const professor = await ProfessorModel.destroy({
      where: {
        id: id,
      },
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return professor != null;
  }

  /**
   * Method that can be used to delete a registerStudentSubject.
   * @param id
   * @returns {Promise<boolean>} A boolean that is true if the deletion was successfull, false otherwise.
   */
  async deleteRegisterStudentSubject(id: string): Promise<boolean> {
    const registerStudentSubject = await RegisterStudentSubjectModel.destroy({
      where: {
        id: id,
      },
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return registerStudentSubject != null;
  }

  /**
   * Method that can be used to update a student by id.
   * @param id
   * @param firstName
   * @param lastName
   * @param birthDate
   * @param address
   * @param email
   * @param phone
   * @returns {Promise<boolean>} A boolean that is true if the update was successfull, false otherwise.
   */
  async updateStudent(
    id: string,
    firstName: string,
    lastName: string,
    birthDate: Date,
    address: string,
    email: string,
    phone: string,
  ): Promise<boolean> {
    const student = await StudentModel.update(
      {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        address: address,
        email: email,
        phone: phone,
      },
      {
        where: {
          id: id,
        },
      },
    ).catch((error) => {
      console.error(error);
      return null;
    });

    return student != null;
  }

  /**
   * Method that can be used to update a subject by id.
   * @param id
   * @param subjectName
   * @param subjectDescription
   * @param professorId
   * @returns {Promise<boolean>} A boolean that is true if the update was successfull, false otherwise.
   */
  async updateSubject(
    id: string,
    subjectName: string,
    subjectDescription: string,
    professorId: string,
  ): Promise<boolean> {
    const subject = await SubjectModel.update(
      {
        subjectName: subjectName,
        subjectDescription: subjectDescription,
        professorId: professorId,
      },
      {
        where: {
          id: id,
        },
      },
    ).catch((error) => {
      console.error(error);
      return null;
    });

    return subject != null;
  }

  /**
   * Method that can be used to update a professor by id.
   * @param id
   * @param firstName
   * @param lastName
   * @param email
   * @returns {Promise<boolean>} A boolean that is true if the update was successfull, false otherwise.
   */
  async updateProfessor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
  ): Promise<boolean> {
    const professor = await ProfessorModel.update(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
      {
        where: {
          id: id,
        },
      },
    ).catch((error) => {
      console.error(error);
      return null;
    });

    return professor != null;
  }

  /**
   * Method that can be used to update a registerStudentSubject by id.
   * @param id
   * @param studentId
   * @param subjectId
   * @param grade
   * @param dateRegistered
   * @returns {Promise<boolean>} A boolean that is true if the update was successfull, false otherwise.
   */
  async updateRegisterStudentSubject(
    id: string,
    studentId: string,
    subjectId: string,
    grade: number,
    dateRegistered: Date,
  ): Promise<boolean> {
    const registerStudentSubject = await RegisterStudentSubjectModel.update(
      {
        studentId: studentId,
        subjectId: subjectId,
        grade: grade,
        dateRegistered: dateRegistered,
      },
      {
        where: {
          id: id,
        },
      },
    ).catch((error) => {
      console.error(error);
      return null;
    });

    return registerStudentSubject != null;
  }

  async searchStudentbyId(id: string): Promise<StudentType | null> {
    const student = await StudentModel.findOne({
      where: {
        id: id,
      },
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return student;
  }

  async searchSubjectbyId(id: string): Promise<SubjectType | null> {
    const subject = await SubjectModel.findOne({
      where: {
        id: id,
      },
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return subject;
  }

  async searchProfessorbyId(id: string): Promise<ProfessorType | null> {
    const professor = await ProfessorModel.findOne({
      where: {
        id: id,
      },
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return professor;
  }

  async searchRegisterStudentSubjectbyId(id: string): Promise<RegisterStudentSubjectType | null> {
    const registerStudentSubject = await RegisterStudentSubjectModel.findOne({
      where: {
        id: id,
      },
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return registerStudentSubject;
  }
}
