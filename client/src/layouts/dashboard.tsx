import { Routes, Route } from "react-router-dom";
import {Sidenav} from "../widgets/layout/sidenav.tsx";
import routes from "../routes.tsx";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav routes={routes} />
      <div className="p-4 xl:ml-80">
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))
          )}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
