import { Outlet } from "react-router-dom";
import NavigationPlane from "./NavigationPlane";

const Layout = () =>
{
  return (
    <>
      <NavigationPlane />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
