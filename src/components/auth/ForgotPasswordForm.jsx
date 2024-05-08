import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { signInSchema } from "../../utils/validation";
import axios from "axios";
import AuthInput from "./AuthInput";
export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailSentInfo, setEmailSentInfo] = useState(null);
  useEffect(() => {}, []);
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(
        "Calling: ${REACT_APP_API_ENDPOINT}/user/doesExist?email=${email}"
      );
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/user/doesExist?email=${email}`
      );
      if (data) {
        //send an otp to the entered email address
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/auth/sendEmail`,
          {
            email: `${email}`,
          }
        );
        console.log("OTP sent successfully: ", response.data.otp);
        setEmailSentInfo(response.data);
        setShowOtpField(true);
      } else {
        console.log("User does not exist!");
        setError({ invalidEmail: "User does not exist!" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // verify otp
    try {
      if (otp == emailSentInfo.otp) {
        console.log("OTP matched");
        navigate(`/resetPassword?email=${email}`);
      } else {
        console.log("Invalid OTP!");
        setError({ otp: "Invalid OTP!" });
      }
    } catch (error) {
      console.log(error.response.data.error.message);
    }
    // Handle OTP verification logic here
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_6 rounded-xl">
        {/*Heading*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Forgot Password</h2>
        </div>
        {/*Form*/}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6"> */}
          <input
            className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
            name="email"
            type="text"
            style={{ color: "white" }}
            value={email}
            placeholder={["Enter your registered email address"]}
            register={register}
            onChange={(e) => setEmail(e.target.value)}
            error={error?.invalidEmail}
          />

          {/*if we have an error*/}
          {error?.invalidEmail ? (
            <div>
              <p className="text-red-400">{error?.invalidEmail}</p>
            </div>
          ) : null}
          {/*Submit button*/}
          {!showOtpField && (
            <button
              className="w-full flex justify-center bg-blue-700 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-blue_1 shadow-lg cursor-pointer transition ease-in duration-300
          "
              type="submit"
            >
              {status === "loading" ? (
                <PulseLoader color="#fff" size={16} />
              ) : (
                "Submit"
              )}
            </button>
          )}

          {/* Sign in link */}
        </form>
        {showOtpField && (
          <form onSubmit={handleOtpSubmit} className="mt-6 space-y-6">
            <input
              className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
              name="otp"
              type="text"
              style={{ color: "white" }}
              value={otp}
              placeholder={["Enter OTP"]}
              register={register}
              onChange={(e) => setOtp(e.target.value)}
              error={error?.otp}
            />
            {error?.otp ? (
              <div>
                <p className="text-red-400">{error?.otp}</p>
              </div>
            ) : null}

            <button
              className="w-full flex justify-center bg-blue-700 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-blue_1 shadow-lg cursor-pointer transition ease-in duration-300
          "
              type="submit"
            >
              {status === "loading" ? (
                <PulseLoader color="#fff" size={16} />
              ) : (
                "Submit OTP"
              )}
            </button>
          </form>
        )}

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
