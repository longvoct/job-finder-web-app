import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import InputHookForm from "../input/InputHookForm";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpin from "../loading/LoadingSpin";
import { auth, db } from "../../firebase-app/firebase-config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const schema = Yup.object({
  username: Yup.string()
    .max(10, "Tên của bạn chỉ được phép tối đa 10 ký tự")
    .required("Vui lòng nhập tên của bạn!"),
  email: Yup.string()
    .email("Địa chỉ email không hợp lệ")
    .required("Vui lòng nhập địa chỉ email của bạn!"),
  password: Yup.string()
    .min(8, "Mật khẩu của bạn phải có ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu của bạn"),
}).required();

const SignUpForm = ({ ...props }) => {
  const [loadingSpin, setLoadingSpin] = useState(false);
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
    if (!isValid) return;
    try {
      setLoadingSpin(true);
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setLoadingSpin(false);

      await updateProfile(auth.currentUser, { displayName: values.username });

      const colRef = collection(db, "users");

      await addDoc(colRef, {
        user_id: user.user.uid,
        username: values.username,
        email: values?.email,
        password: values?.password,
        createdAt: serverTimestamp(),
      });

      toast.success("Tạo tài khoản thành công !");
      reset({
        username: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log("error: ", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Địa chỉ email này đã được sử dụng!");
      }
      // if (error.code === "auth/invalid-email") {
      //   console.log("Địa chỉ email không hợp lệ!");
      // }
      setLoadingSpin(false);
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
          <label htmlFor="email">Tên tài khoản</label>
          <InputHookForm
            name="username"
            type="username"
            id="username"
            control={control}
            placeholder="Nhập tên của bạn"
          />
          {errors?.username && (
            <p className="text-sm font-[300] text-red-500">
              {errors?.username?.message}
            </p>
          )}
        </div>

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
        <p>
          Đã có tài khoản?{" "}
          <Link to="/login">
            <strong className="cursor-pointer text-[#fa427f]">Đăng nhập</strong>
          </Link>
        </p>

        {!loadingSpin ? (
          <button
            type="submit"
            className="mt-6 flex items-center justify-center w-full p-4 bg-[#867eee] text-white font-semibold rounded-lg active:bg-opacity-90"
          >
            Đăng Ký
          </button>
        ) : (
          <button
            type="submit"
            className="pointer-events-none mt-6 flex items-center justify-center w-full p-4 bg-[#867EEE] text-white font-semibold rounded-lg bg-opacity-80"
          >
            <LoadingSpin></LoadingSpin>
          </button>
        )}
      </form>
      <ToastContainer autoClose={1000} />
    </div>
  );
};
export default SignUpForm;
