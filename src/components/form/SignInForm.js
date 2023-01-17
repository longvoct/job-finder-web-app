import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import InputHookForm from "../input/InputHookForm";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpin from "../loading/LoadingSpin";
import { auth } from "../../firebase-app/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const schema = Yup.object({
  email: Yup.string()
    .email("Địa chỉ email không hợp lệ")
    .required("Vui lòng nhập địa chỉ email của bạn!"),
  password: Yup.string()
    .min(8, "Mật khẩu của bạn phải có ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu của bạn"),
}).required();

const SignInForm = ({ http, setToken, ...props }) => {
  const [loadingSpin, setLoadingSpin] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (values) => {
    try {
      setLoadingSpin(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      setLoadingSpin(false);
      console.log("Login successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
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
          <label htmlFor="email">Địa chỉ email</label>
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
            <p className="text-sm font-[300] text-red-500">
              {errors?.password?.message}
            </p>
          )}
        </div>
        {errorLogin === true && (
          <div className="text-sm text-red-500 font-[300]">
            Incorrect account or password
          </div>
        )}
        <p>
          Bạn chưa có tài khoản?{" "}
          <Link to="/signup">
            <strong className="cursor-pointer text-[#30DB59]">
              Tạo tài khoản
            </strong>
          </Link>
        </p>

        {!loadingSpin ? (
          <button
            type="submit"
            className="mt-6 flex items-center justify-center w-full p-4 bg-[#35405a] text-white font-semibold rounded-lg active:bg-opacity-90"
          >
            Đăng Nhập
          </button>
        ) : (
          <button
            type="submit"
            className="pointer-events-none mt-6 flex items-center justify-center w-full p-4 bg-[#35405a] text-white font-semibold rounded-lg bg-opacity-80"
          >
            <LoadingSpin></LoadingSpin>
          </button>
        )}
      </form>
    </div>
  );
};
export default SignInForm;
