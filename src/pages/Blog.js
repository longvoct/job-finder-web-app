import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import DropdownHook from "../components/dropdown/DropdownHook";
import ImageUpload from "../components/image/ImageUpload";
import InputHookForm from "../components/input/InputHookForm";
import useFirebaseImage from "../hooks/useFirebaseImage";
import { db } from "../firebase-app/firebase-config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../contexts/auth-context";

const HomePage = () => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const {
    image,
    setImage,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage({ setValue, getValues });
  const { userInfo } = useAuth();

  const addPostHandler = async (values) => {
    const colRef = collection(db, "blogs");
    await addDoc(colRef, {
      ...values,
      user_id: userInfo.uid,
      image: image,
      createdAt: serverTimestamp(),
    });
    toast.success("Đăng bài thành công!");
    reset({
      title: "",
      type: "",
      content: "",
    });
    setImage(null);
    setProgress(0);
  };

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="w-full max-w-[1240px] mx-auto">
      {/* Mô tả công việc */}
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="mt-5">
          <span className="font-[700] text-[20px] text-[#fc7a78]">
            Đăng bài viết
          </span>
          <div className="mt-5 w-full grid grid-cols-2 gap-x-[150px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-[600]">
                Tiêu đề
              </label>
              <InputHookForm
                control={control}
                name="title"
                id="title"
                placeholder="Tên tiêu đề"
              />
              {errors?.title && (
                <p className="text-sm font-[300] text-red-500">
                  {errors?.title?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="type" className="font-[600]">
                Thể loại
              </label>
              <InputHookForm
                control={control}
                name="type"
                id="type"
                placeholder="Loại bài viết..."
              />
              {errors?.type && (
                <p className="text-sm font-[300] text-red-500">
                  {errors?.type?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-5 w-full grid grid-cols-2 gap-x-[150px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="content" className="font-[600]">
                Nội dung
              </label>
              <textarea
                {...register("content")}
                id="content"
                placeholder={"Thêm mô tả về công việc ..."}
                className="w-[550px] h-[300px] p-4 mb-2 border border-solid border-gray-200 rounded-lg transition-all resize-none focus:border-[#35405a]"
              ></textarea>
              {errors?.content && (
                <p className="text-sm font-[300] text-red-500">
                  {errors?.content?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col pb-10">
                <label htmlFor="" className="font-[600]">
                  Ảnh bài viết
                </label>
                <ImageUpload
                  className="mt-2 w-[550px] h-[300px]"
                  onChange={handleSelectImage}
                  progress={progress}
                  image={image}
                  handleDeleteImage={handleDeleteImage}
                ></ImageUpload>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-[#fc7a78] rounded-lg w-[200px] h-[60px] active:bg-[#ffa6a4]"
        >
          Đăng bài
        </button>
      </form>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default HomePage;
