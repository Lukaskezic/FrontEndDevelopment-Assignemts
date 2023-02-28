import { Routes, Route } from "react-router-dom";
import RequireAuthentication from "./Authentication/RequireAuthentication";

import Login from "./Pages/Login";
import Model from "./Pages/Model";
import Manager from "./Pages/Manager";
import NotAuthorized from "./Pages/NotAuthorized";
import NotFound from "./Pages/NotFound";

import Layout from "./Layout/Layout";

import "./styling/index.css";
import { SetupInterceptors } from "./APIs/Utilities";

const App = () => {
  SetupInterceptors();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {}
        <Route path="login" element={<Login />} />
        <Route path="notauthorized" element={<NotAuthorized />} />

        {}
        <Route element={<RequireAuthentication allowedRoles={["Model"]} />}>
          <Route path="model" element={<Model />} />
        </Route>

        <Route element={<RequireAuthentication allowedRoles={["Manager"]} />}>
          <Route path="manager" element={<Manager />} />
        </Route>

        {}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
