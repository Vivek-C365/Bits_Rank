import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import Analytics from "/login_ilus.png";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess, handleWarning } from "../../utils";
import { signUpSchema } from "../../Data_validate/validationData.jsx";
import { useSignupUserMutation } from "../../Redux_cm/Service/userAuthApi.jsx";

const SignUp = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupUser] = useSignupUserMutation();

  // Debounce logic for submit button
  let debounceTimeout = useMemo(() => null, []);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUser((prevState) => ({ ...prevState, [name]: value }));
    },
    [setUser]
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (debounceTimeout) return; // Block submissions within the debounce period

    debounceTimeout = setTimeout(() => {
      debounceTimeout = null;
    }, 2500);

    const { email, password } = user;

    // Validate user data using Joi
    const { error } = await signUpSchema.validate(
      { email, password },
      { abortEarly: true }
    );

    if (error) {
      const validationErrors = error.details.map((err) => err.message).join(", ");
      return handleError(validationErrors); // Show all error messages
    }

    setIsSubmitting(true);

    try {
      const result = await signupUser({ email, password });
      if (result.error) {
        handleWarning(result.error.data.message);
      } else {
        handleSuccess("Account created successfully");
        setUser({ email: "", password: "" });
      }
    } catch (error) {
      if (error.message === "Network Error") {
        handleError("Network error. Please try again later.");
      } else {
        handleError("Invalid request");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-wrap bg-white signup_texture_backdrop">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12  md:justify-start md:pl-12">
          <Link to="/" className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900">
            Bits Rank .
          </Link>
        </div>

        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="text-center text-3xl font-bold">Create Account</p>
          <p className="mt-2 text-center text-gray-500">Welcome, please enter your details.</p>
          
          <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white">
            <img className="mr-2 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google Icon" />
            Continue with Google
          </button>

          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
          </div>

          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleFormSubmit}>
            <div className="flex flex-col pt-4">
              <label htmlFor="SignUp-email" className="sr-only">Email</label>
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  type="email"
                  id="SignUp-email"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="mb-12 flex flex-col pt-4">
              <label htmlFor="SignUp-password" className="sr-only">Password</label>
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  type="password"
                  id="SignUp-password"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              id="SignUp-button"
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Create Account"}
            </button>
          </form>

          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-600">
              {`Already have an account? `}
              <Link to="/Login" className="underline-offset-4 font-semibold text-gray-900 underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
        <img loading="lazy" className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src={Analytics} alt="Analytics" />
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default SignUp;
