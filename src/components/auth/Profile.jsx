import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import {
  changeStatus,
  registerUser,
  updateUser,
} from "../../features/userSlice";
import { useState } from "react";
import Picture from "./Picture";
import axios from "axios";
const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

function Profile() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState(user.picture);
  const [ChangePass, setChangePass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateSchema),
  });

  const onSubmit = async (data) => {
    dispatch(changeStatus("loading"));
    if (picture) {
      //upload to cloudinary and then register user
      await uploadImage().then(async (response) => {
        let res = await dispatch(
          updateUser({ ...data, picture: response.secure_url })
        );
        if (res?.payload?.user) {
          navigate("/");
        }
      });
    } else {
      let res = await dispatch(updateUser({ ...data, picture: user.picture }));
      if (res?.payload?.user) {
        navigate("/");
      }
    }
  };

  const handleChange = () => {
    setChangePass(!ChangePass);
  };

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    return data;
  };

  return (
    <div className="min-h-screen w-full flex justify-center overflow-hidden ">
      {/* Container */}
      <div className=" w-full max-w-md space-y-2 p-2 dark:bg-dark_bg_6 rounded-xl ">
        {/*Heading*/}
        <div className="text-center dark:text-dark_text_1 ">
          <h2 className=" text-3xl font-bold">Profile</h2>
          <div className=" mt-5 items-center justify-center " />
          <div className="mx-auto w-64 text-center  ">
            {/* Picture */}
            <Picture
              readablePicture={readablePicture}
              setReadablePicture={setReadablePicture}
              setPicture={setPicture}
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" mt-6 space-y-6 "
            >
              <AuthInput
                name="name"
                type="text"
                placeholder={["Name", user.name]}
                register={register}
                error={errors?.name?.message}
              />
              <AuthInput
                name="email"
                type="text"
                placeholder={["Email", user.email]}
                register={register}
                error={errors?.email?.message}
              />
              <AuthInput
                name="status"
                type="text"
                placeholder={[
                  "Status",
                  user.status ? user.status : "Status (Optional)",
                ]}
                register={register}
                error={errors?.status?.message}
              />
              {user.googleSignIn ? (
                ""
              ) : (
                <div>
                  <label>
                    <input
                      className="mr-5 mt-8"
                      type="checkbox"
                      checked={ChangePass}
                      onChange={handleChange}
                    />
                    <label>Change Password</label>
                  </label>
                  {ChangePass ? (
                    <>
                      <AuthInput
                        name="currentPassword"
                        type="password"
                        placeholder={["Current Password", ""]}
                        register={register}
                        error={errors?.currentPassword?.message}
                      />
                      <AuthInput
                        name="newPassword"
                        type="password"
                        placeholder={["New Password", ""]}
                        register={register}
                        error={errors?.newPassword?.message}
                      />
                      <AuthInput
                        name="reNewPassword"
                        type="password"
                        placeholder={["ReEnter New Password", ""]}
                        register={register}
                        error={errors?.reNewPassword?.message}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              )}

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
                  "Update Profile"
                )}
              </button>
              {/* Sign in link */}
              <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                <Link
                  to="/"
                  className=" hover:underline cursor-pointer transition ease-in duration-300"
                >
                  Back
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

{
  /* 
  
  <div class=" w-64">
              <img
                class="w-64 h-64 rounded-full"
                src={user.picture}
                alt={user.name}
              />
              <div class="w-64 h-64 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
                <img
                  class="hidden group-hover:block w-12"
                  src="https://www.svgrepo.com/show/33565/upload.svg"
                  alt=""
                />
              </div>
            </div>
  
  
  
  
  
  
  
  <label
              class="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Update Profile Picture
            </label>
            <input
              class="block w-full mt-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-blue-500 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            ></input>
            <button
              className="w-full flex justify-center bg-blue-700 text-gray-100 p-2 mt-5 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-blue_1 shadow-lg cursor-pointer transition ease-in duration-300
          "
              type="submit"
            >
              Upload
            </button>
            <button
              className="w-full flex justify-center bg-blue-700 text-gray-100 p-2 mt-5 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-blue_1 shadow-lg cursor-pointer transition ease-in duration-300
          "
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </button> */
}
