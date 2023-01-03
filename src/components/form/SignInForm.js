import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import InputHookForm from "../input/InputHookForm";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingSpin from "../loading/LoadingSpin";

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(8, "Your password must be at least 8 characters")
    .required("Please enter your password"),
}).required();

const SignInForm = ({ http, setToken, ...props }) => {
  const [loadingSpin, setLoadingSpin] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    http
      .post("/login", {
        ...data,
      })
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((error) => {
        console.log(error);
        setLoadingSpin(false);
        setErrorLogin(true);
      });
    if (isValid) {
      setLoadingSpin(true);
    }
  };
  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (
    <div className="w-full max-w-[450px] mx-auto text-[14px]">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <InputHookForm
            name="email"
            type="email"
            control={control}
            placeholder="Nhập địa chỉ email"
            id="email"
          />
          {errors?.email && (
            <p className="text-sm font-[300] text-red-500">
              {errors?.email?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Mật khẩu</label>
          <InputHookForm
            type="password"
            name="password"
            control={control}
            placeholder="Nhập mật khẩu"
            id="password"
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors?.password?.message}</p>
          )}
        </div>
        {errorLogin === true && (
          <div className="text-sm text-red-500 font-[400]">
            Incorrect account or password
          </div>
        )}
        <p>
          Bạn chưa có tài khoản?{" "}
          <strong className="cursor-pointer text-[#fa427f]">Sign up</strong>
        </p>

        {!loadingSpin ? (
          <button
            type="submit"
            className="mt-6 flex items-center justify-center w-full p-4 bg-[#867EEE] text-white font-semibold rounded-lg active:bg-opacity-90"
          >
            Đăng Nhập
          </button>
        ) : (
          <button
            type="submit"
            className="pointer-events-none mt-6 flex items-center justify-center w-full p-4 bg-[#CF99FF] text-white font-semibold rounded-lg active:bg-opacity-90"
          >
            <LoadingSpin></LoadingSpin>
          </button>
        )}
      </form>
    </div>
  );
};
export default SignInForm;
