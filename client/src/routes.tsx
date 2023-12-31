import { HomeIcon } from "@heroicons/react/24/solid";
import { Students } from "./pages/dashboard/students.tsx";
import { Subjects } from "./pages/dashboard/subjects.tsx";
import { Professors } from "./pages/dashboard/professors.tsx";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Students",
        path: "/students",
        element: <Students />,
      },
    ],
  },
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Subjects",
        path: "/subjects",
        element: <Subjects />,
      },
    ],
  },
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Professors",
        path: "/professors",
        element: <Professors />,
      },
    ],
  },
];

export default routes;
