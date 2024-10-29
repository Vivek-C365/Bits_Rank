import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import B_logo from "/Frame.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slice/authSlice";
export default function NavbarComponent() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // State to store the user's email

  const dispatch = useDispatch();
  // Fetch user data on mount or when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      // Assuming the user's token is stored in localStorage
      const token = localStorage.getItem("accessToken");
      if (token) {
        // Fetch user email from the token or API (here assumed decoded from token)
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        setUserEmail(decodedToken.email); // Assuming email is part of the payload
      }
    }
  }, [isAuthenticated]);
  const menuItems = isAuthenticated
    ? [
        {
          label: "Dashboard",
          link: "/dashboard",
        },
        {
          label: "Profile",
          link: "/profile",
        },
        {
          label: "Settings",
          link: "/settings",
        },
      ]
    : [
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
        {
          label: "Login",
          link: "/Login",
        },
        {
          label: "Sign Up",
          link: "/SignUp",
        },
      ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-F7F4EE">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-black-10"
        />
        <NavbarBrand className=" max_639:w-full">
          <img src={B_logo} alt="Brand Logo" className="w-10" />
        </NavbarBrand>
      </NavbarContent>

      {isAuthenticated ? (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Blog
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Help
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="User"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14 gap-2"
                textValue="Signed in as user@example.com"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userEmail || "Loading..."}</p>
              </DropdownItem>
              <DropdownItem key="settings" textValue="My Settings">
                My Settings
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={handleLogout}
                textValue="Log Out"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden min_640:flex">
              <NavLink to="/Login" className="text-dimblack">
                <Button
                  className="text-dimblack bg-transparent border border-dimblack h-8"
                  variant="flat"
                >
                  Login
                </Button>
              </NavLink>
            </NavbarItem>
            <NavbarItem className="hidden min_640:flex">
              <NavLink to="/SignUp">
                <Button className="bg-dimblack  text-white h-8" variant="flat">
                  Sign Up
                </Button>
              </NavLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full text-slate-900" href={item.link} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
