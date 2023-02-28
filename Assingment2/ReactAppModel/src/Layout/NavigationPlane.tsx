import { BrowserRouter as Route, Router, Link } from "react-router-dom";

import { Navbar } from "flowbite-react";

const NavigationPlane = () =>
{
  return (
    <nav className="flex justify-left">
      <Navbar
        fluid={true}
        rounded={false}
        className="sticky top-0 shadow-md bg-white w-full flex justify-left "
      >
        <Navbar.Toggle className="hover:text-black-500" />

        <Navbar.Collapse>
          <Navbar.Link className="hover:text-black-500">
            <Link to="/manager">Manager</Link>
          </Navbar.Link>

          <Navbar.Link className="hover:text-black-500">
            <Link to="/model">Model</Link>
          </Navbar.Link>

          <Navbar.Link className="hover:text-black-500">
            <Link to="/login">Login</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
};

export default NavigationPlane;
