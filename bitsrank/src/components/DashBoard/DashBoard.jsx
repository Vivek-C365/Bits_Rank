import { Outlet, Routes, Route } from "react-router-dom";
import Profile from "./Profile/Profile";
import SideNav from "./Dash_Nav/SideNav";
// import Page404 from "../Error/Page404";
import Home from "./Dash_home/Home";

function Dashboard() {
  return (
    <>
      <SideNav />
      {/* Define Nested Routes */}
      <Routes>
        {/* <Route path="*" element={<Page404 />} /> */}
        <Route path="/" element={<Home />} />

        <Route path="profile" element={<Profile />} />
      </Routes>

      <Outlet />
    </>
  );
}

export default Dashboard;
