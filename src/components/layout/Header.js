import React from "react";
import { NavLink } from "react-router-dom";
import logo2 from "../../assets/images/logo2.png";

const Header = ({ userInfo, signOut, ...props }) => {
  return (
    <div className="w-full bg-[#a099ff]">
      <header className="px-[100px] py-2 flex shadow-md">
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <img src={logo2} alt="" className="w-[50px] h-full object-cover" />
            <span className="font-bold text-[20px] text-white tracking-wide">
              CatinDob
            </span>
            <div className="ml-12 flex gap-x-5 text-white font-[600]">
              <NavLink
                to="/"
                style={{ padding: "15px 15px", borderRadius: "8px" }}
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#756cee] transition-all duration-500"
                    : "transition-all"
                }
              >
                <span>Đăng tuyển dụng</span>
              </NavLink>
              <NavLink
                to="/upload-cv"
                style={{ padding: "15px 15px", borderRadius: "8px" }}
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#756cee]  transition-all duration-500"
                    : "transition-all"
                }
              >
                <span>Upload CV</span>
              </NavLink>
            </div>
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
