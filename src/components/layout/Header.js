import React from "react";
import logo2 from "../../assets/images/logo2.png";

const Header = ({ userInfo, signOut, ...props }) => {
  return (
    <div className="w-full bg-[#867EEE]">
      <header className="px-[100px] py-2 flex shadow-md">
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <img src={logo2} alt="" className="w-[50px] h-full object-cover" />
            <span className="font-bold text-[20px] text-white tracking-wide">
              CatinDob
            </span>
          </div>

          <div className="">
            <span className="text-white mr-10">
              Chào, <span className="font-bold">{userInfo?.displayName}</span>
            </span>
            <button
              onClick={signOut}
              className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-[#424244] bg-[#fbfbfb] rounded-lg h-[52px]"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
