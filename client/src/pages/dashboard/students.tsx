import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { BackendService } from "@genezio-sdk/crud-app_eu-central-1";
import { StudentType } from "@genezio-sdk/crud-app_eu-central-1";
import { ModalAdd } from "../../widgets/layout/modelAdd.tsx";
import ModalDelete from "../../widgets/layout/modelDelete.tsx";

export function Students() {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDeleteId, setStudentToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await BackendService.getStudents();
        setStudents(studentsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (id: string) => {
    setIsDeleteModalOpen(true);
    setStudentToDeleteId(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setStudentToDeleteId(null);
  };

  const handleAddStudent = async (newStudent: StudentType) => {
    if (newStudent.firstName === undefined || newStudent.lastName === undefined ||
      newStudent.birthDate === undefined || newStudent.address === undefined ||
      newStudent.email === undefined || newStudent.phone === undefined) {
      alert("Please fill all fields");
      return;
    }
    const response = await BackendService.createStudent(
      newStudent.firstName,
      newStudent.lastName,
      newStudent.birthDate,
      newStudent.address,
      newStudent.email,
      newStudent.phone,
    );
    console.log(response);
    if (response) {
      window.location.reload();
    }
  };

  const handleDeleteStudent = async () => {
    if (!studentToDeleteId) return;

    // Call BackendService.deleteStudent(studentToDeleteId) here
    // After successful deletion, update the state to remove the deleted student
    // Example:
    // setStudents((prevStudents) => prevStudents.filter(student => student.id !== studentToDeleteId));

    closeDeleteModal();
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card  placeholder>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6"
          placeholder
        >
          <Typography variant="h6" color="white" placeholder="true" className="mx-auto">
            Students
            <div className="flex justify-end mr-3 mt-[-2rem]">
              <button
                onClick={openModal}
                className="block text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                type="button"
              >
                Add Student
              </button>
            </div>
          </Typography>
        </CardHeader>
        <CardBody
          className="overflow-x-scroll px-0 pt-0 pb-2"
          placeholder="true"
        >
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="py-3 px-5 border-b border-blue-gray-50">ID</th>
                <th className="py-3 px-5 border-b border-blue-gray-50">
                  First Name
                </th>
                <th className="py-3 px-5 border-b border-blue-gray-50">
                  Last Name
                </th>
                <th className="py-3 px-5 border-b border-blue-gray-50">
                  Birth Date
                </th>
                <th className="py-3 px-5 border-b border-blue-gray-50">
                  Address
                </th>
                <th className="py-3 px-5 border-b border-blue-gray-50">
                  Email
                </th>
                <th className="py-3 px-5 border-b border-blue-gray-50">
                  Phone
                </th>
                <th className="py-3 px-5 border-b border-blue-gray-50">
                  Created At
                </th>
                <th className="py-3 px-5 border-b border-blue-gray-50">Delete</th>
              </tr>
            </thead>
            <tbody>
              {students.map(
                ({
                  id,
                  firstName,
                  lastName,
                  birthDate,
                  address,
                  email,
                  phone,
                  createdAt,
                }) => {
                  const className = "py-3 px-5 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={className}>{id}</td>
                      <td className={className}>{firstName}</td>
                      <td className={className}>{lastName}</td>
                      <td className={className}>{birthDate?.toString()}</td>
                      <td className={className}>{address}</td>
                      <td className={className}>{email}</td>
                      <td className={className}>{phone}</td>
                      <td className={className}>{createdAt?.toString()}</td>
                      <td className={className}>
                        <button
                          onClick={() => openDeleteModal(id)}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Modal goes here */}
      <ModalAdd
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddStudent={handleAddStudent}
      />

      <ModalDelete
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteStudent}/>
    </div>
  );
}

export default Students;
