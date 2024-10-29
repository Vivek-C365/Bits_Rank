import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import DashBoard from "./components/DashBoard/DashBoard";
import PageAuth from "./PageAuth";

import Page404 from "./components/Error/Page404";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoute component to protect dashboard access
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/Login" />;
  };
  PrivateRoute.propTypes = {
    element: PropTypes.node.isRequired, // Expecting a React node for the element prop
  };

  return (
    <BrowserRouter>
      <PageAuth setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/dashboard"
          element={<PrivateRoute element={<DashBoard />} />}
        />

        {/* 404 Route at the bottom */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
