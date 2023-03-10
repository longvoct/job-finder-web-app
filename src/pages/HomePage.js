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
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      wage: "",
      type_job: "",
      career: "",
      description: "",
      requirement: "",
      name_company: "",
      address: "",
      image: "",
    },
  });

  const {
    image,
    setImage,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage({ setValue, getValues });
  const { userInfo } = useAuth();
  const [typeJobs, setTypeJobs] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const colRef = collection(db, "type_jobs");
    //1. getDocs
    // getDocs(colRef).then((snapshot) => {
    //   console.log("snapshot: ", snapshot);
    //   let result = [];
    //   snapshot.docs.forEach((doc) => {
    //     console.log("doc: ", doc);
    //     result.push({
    //       id: doc.id,
    //       ...doc.data(),
    //     });
    //   });
    //   console.log("result: ", result);
    //   setTypeJobs(result);
    // });
    //2. onSnapshot
    onSnapshot(colRef, (snapshot) => {
      let result = [];
      snapshot.docs.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTypeJobs(result);
    });
  }, [reducerValue]);

  const addPostHandler = async (values) => {
    let typePost = 0;
    if (userInfo?.type === 1) {
      typePost = 1;
    }
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      ...values,
      user_id: userInfo.uid,
      image: image,
      feedbacks: [],
      typePost: typePost,
      createdAt: serverTimestamp(),
    });
    toast.success("????ng b??i th??nh c??ng!");
    forceUpdate();
    reset({
      title: "",
      wage: "",
      career: "",
      description: "",
      requirement: "",
      name_company: "",
      address: "",
    });
    setImage(null);
    setProgress(0);
    setValue("type_job", "Ch???n g?? ???? ??i");
    setTypeJobs([]);
    // handleUploadImage(values.image);
  };

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="w-full max-w-[1240px] mx-auto">
      {/* M?? t??? c??ng vi???c */}
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="mt-5">
          <span className="font-[700] text-[20px] text-[#fc7a78]">
            M?? t??? c??ng vi???c
          </span>
          <div className="mt-5 w-full grid grid-cols-2 gap-x-[150px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-[600]">
                Ch???c danh
              </label>
              <InputHookForm
                control={control}
                name="title"
                id="title"
                placeholder="T??n ch???c danh"
              />
              {errors?.title && (
                <p className="text-sm font-[300] text-red-500">
                  {errors?.title?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="wage" className="font-[600]">
                M???c l????ng
              </label>
              <InputHookForm
                control={control}
                name="wage"
                id="wage"
                placeholder="M???c l????ng kho???ng..."
              />
              {errors?.wage && (
                <p className="text-sm font-[300] text-red-500">
                  {errors?.wage?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-5 w-full grid grid-cols-2 gap-x-[150px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="type_job" className="font-[600]">
                Lo???i vi???c l??m
              </label>
              <DropdownHook
                control={control}
                name="type_job"
                id="type_job"
                data={typeJobs}
                dropdownLabel="Ch???n lo???i vi???c l??m"
                setValue={setValue}
              />
              {errors?.type_job && (
                <p className="text-sm font-[300] text-red-500">
                  {errors?.type_job?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="career" className="font-[600]">
                Ng??nh ngh???
              </label>
              <InputHookForm
                control={control}
                name="career"
                id="career"
                placeholder="Ch???n ng??nh ngh???"
              />
              {errors?.career && (
                <p className="text-sm font-[300] text-red-500">
                  {errors?.career?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-5 w-full grid grid-cols-2 gap-x-[150px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-[600]">
                M?? t???
              </label>
              <textarea
                {...register("description")}
                id="description"
                placeholder={"Th??m m?? t??? v??? c??ng vi???c ..."}
                className="w-[550px] h-[200px] p-4 mb-2 border border-solid border-gray-200 rounded-lg transition-all resize-none focus:border-[#35405a]"
              ></textarea>
              {errors?.description && (
                <p className="text-sm font-[300] text-red-500">
                  {errors?.description?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="requirement" className="font-[600]">
                Y??u c???u c??ng vi???c
              </label>
              <textarea
                {...register("requirement")}
                id="requirement"
                placeholder={"Nh???ng y??u c???u  trong c??ng vi???c ..."}
                className="w-[550px] h-[200px] p-4 mb-2 border border-solid border-gray-200 rounded-lg transition-all resize-none focus:border-[#35405a]"
              ></textarea>
              {errors?.requirement && (
                <p className="text-sm font-[300] text-red-500">
                  {errors?.requirement?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* C??ng ty */}
        <div className="mt-10">
          <span className="font-[700] text-[20px] text-[#fc7a78]">
            Th??ng tin c??ng ty
          </span>
          <div className="mt-5 w-full grid grid-cols-2 gap-x-[150px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="name_company" className="font-[600]">
                T??n c??ng ty
              </label>
              <InputHookForm
                control={control}
                name="name_company"
                id="name_company"
                placeholder="T??n c??ng ty c???a b???n"
              />
              {errors?.name_company && (
                <p className="text-sm font-[300] text-red-500">
                  {errors?.name_company?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="font-[600]">
                ?????a ch???
              </label>
              <InputHookForm
                control={control}
                name="address"
                id="address"
                placeholder="?????a ch??? c??ng ty"
              />
              {errors?.address && (
                <p className="text-sm font-[300] text-red-500">
                  {errors?.address?.message}
                </p>
              )}
            </div>
          </div>
          <div className="my-10 flex justify-between">
            <div className="flex flex-col pb-10">
              <label htmlFor="" className="font-[600]">
                Logo c??ng ty
              </label>
              <ImageUpload
                className="mt-5 w-[300px] h-[300px]  min-h-0 mx-auto"
                onChange={handleSelectImage}
                progress={progress}
                image={image}
                handleDeleteImage={handleDeleteImage}
              ></ImageUpload>
            </div>
            <button
              type="submit"
              className="-translate-x-[345px] inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-[#fc7a78] rounded-lg w-[200px] h-[60px] active:bg-[#ffa6a4]"
            >
              L??u th??ng tin
            </button>
          </div>
        </div>
      </form>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default HomePage;
