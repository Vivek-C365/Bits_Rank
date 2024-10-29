import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import B_logo from "/Frame.png";
import { Link, NavLink } from "react-router-dom";
export function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const [loginRedirect] = React.useState("/Login");
  const [SignUpRedirect] = React.useState("/SignUp");
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const menuItems = [
    {
      label: "Features",
      link: "#",
    },
    {
      label: "Blog",
      link: "#",
    },
    {
      label: "Integrations",
      link: "#",
    },
    {
      label: "Help",
      link: "#",
    },
  ];

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {menuItems.map((item, index) => (
        <Typography
          key={index}
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          <NavLink to={item.link}>{item.label}</NavLink>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar className=" backdrop-saturate-200  sticky top-2 z-40 mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 text-dimblack">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to={"/"}>
          <img src={B_logo} alt="Brand Logo" className="w-10" />
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <NavLink to={loginRedirect}>
            <Button variant="text" size="sm" className="hidden lg:inline-block">
              <span>Log In</span>
            </Button>
          </NavLink>

          <NavLink to={SignUpRedirect}>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Sign up</span>
            </Button>
          </NavLink>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center justify-center gap-x-1">
            <NavLink to={loginRedirect}>
              <Button
                to="/Login"
                fullWidth
                variant="text"
                size="sm"
                className=""
              >
                <span>Log In</span>
              </Button>
            </NavLink>
            <NavLink to={SignUpRedirect}>
              <Button fullWidth variant="gradient" size="sm" className="">
                <span>Sign Up</span>
              </Button>
            </NavLink>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
