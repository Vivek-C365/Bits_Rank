import { useState } from "react";
import Analytics from "/login_ilus.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess, handleWarning } from "../../utils";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../Redux_cm/Slice/authSlice";
import api from "../../Api/api";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesubmit = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleform = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    if (!email || !password) {
      handleError("Please enter email and password");
      return;
    }

    try {
      const response = await api.post("user/login", {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        handleSuccess(data.message);
        dispatch(setAccessToken(data.setIsAuthenticated));
        dispatch(setAccessToken(data.accessToken));

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1000);
      } else {
        handleWarning(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex flex-wrap bg-white signup_texture_backdrop">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12  md:justify-start md:pl-12">
          <Link
            to="/"
            className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"
          >
            Bits Rank .
          </Link>
        </div>
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="text-center text-3xl font-bold">Log in</p>
          <p className="mt-2 text-center text-gray-500">
            Welcome, please enter your details.
          </p>
          <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white">
            <img
              className="mr-2 h-5"
              src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
              alt="Analytics Image"
              loading="lazy"
            />{" "}
            Log in with Google
          </button>
          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
              or
            </div>
          </div>
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleform}>
            <div className="flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  name="email"
                  value={user.email}
                  onChange={handlesubmit}
                  type="email"
                  id="login-email"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-12 flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  name="password"
                  value={user.password}
                  onChange={handlesubmit}
                  type="password"
                  id="login-password"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
            >
              Log in
            </button>
          </form>
          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-600">
              {" "}
              {`Don't have an account? `}
              <Link
                to="/SignUp"
                className="underline-offset-4 font-semibold text-gray-900 underline"
              >
                Sign up for free.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
        <img
          className="-z-1  absolute top-0 h-full w-full object-cover opacity-90"
          src={Analytics}
          alt="true"
          loading="lazy"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
