import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { signInSchema } from "../../utils/validation";

import { useLocation } from "react-router-dom";
export default function RegisterForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const { state, err } = useSelector((state) => state);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  useEffect(() => {}, []);
  const { register } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const handleSubmit = async (e, values) => {
    e.preventDefault();
    try {
      console.log(password, confirmPassword);
      if (password === confirmPassword) {
        console.log("Passwords match!");
        console.log(
          `Email: ${email} Calling: \${REACT_APP_API_ENDPOINT}/auth/updatePassword`
        );
        const response = await axios.patch(
          `${process.env.REACT_APP_API_ENDPOINT}/auth/updatePassword`,
          {
            email: `${email}`,
            password: `${password}`,
          }
        );
        console.log("Message:", response.data.message);
        navigate(`/login`);
      } else {
        console.log("Passwords doesn't match");
        setError("Passwords doesn't match");
      }
    } catch (error) {
      console.log(error.response.data.error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_6 rounded-xl">
        {/*Heading*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Reset password</h2>
        </div>
        {/*Form*/}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">

          <input
            className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
            name="password"
            type="password"
            style={{ color: "white" }}
            value={password}
            placeholder={["Enter new password"]}
            register={register}
            onChange={(e) => setPassword(e.target.value)}
            error={error?.password?.message}
          />
          <input
            className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
            name="confirmPassword"
            type="password"
            style={{ color: "white" }}
            value={confirmPassword}
            placeholder={["Re enter new password"]}
            register={register}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error?.password?.message}
          />

          {/*if we have an error*/}
          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}
          {/*Submit button*/}
          <button
            className="w-full flex justify-center bg-blue-700 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-blue_1 shadow-lg cursor-pointer transition ease-in duration-300
          "
            type="submit"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign in"
            )}
          </button>

          {/* Sign in link */}

          {status == "failed" ? (
            <p className="text-red-500 text-center">{state}</p>
          ) : (
            <p className="text-red-50 text-center"></p>
          )}
        </form>

        <div className="mx-auto w-64 text-center text-white">
          <Link
            to="/login"
            className="hover:underline cursor-pointer transition ease-in duration-300"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
