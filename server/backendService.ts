import { GenezioDeploy } from "@genezio/types";
import { Sequelize, DataTypes } from "sequelize";
import { StudentModel } from "./db/Student";
import { SubjectModel } from "./db/Subject";
import { ProfessorModel } from "./db/Professor";
import { RegisterStudentSubjectModel } from "./db/RegisterStudentSubject";
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
    }).catch((error) => {
      console.error(error);
      return null;
    });

    return registerStudentSubject != null;
  }
}
