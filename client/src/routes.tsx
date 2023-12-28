import {
  HomeIcon,
} from "@heroicons/react/24/solid";
import {Students} from "./pages/dashboard/students.tsx"

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
        name: "Students",
        path: "/home",
        element: <Students />,
      },
    ],
  },
];

export default routes;
