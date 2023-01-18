import React from "react";
import logo from "../assets/images/logo.png";
import SignUpForm from "../components/form/SignUpForm";

const SignUp = () => {
  return (
    <div className="bg-[#fff] pb-10">
      <div className="mt-[80px] shadow-xl flex w-full max-w-[550px] mx-auto">
        <div className="flex-[5] bg-[#fbfbfb] flex flex-col p-10 items-center">
          <div className="mb-8 flex flex-col items-center justify-center gap-y-2">
            <img src={logo} alt="" className="w-[60px] h-full object-cover" />
            <span className="font-[500] mt-2 text-[16px]">
              Welcome to{" "}
              <span className="text-[#35405a] font-[700]">CatinDob!</span>
            </span>
          </div>
          <SignUpForm></SignUpForm>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
