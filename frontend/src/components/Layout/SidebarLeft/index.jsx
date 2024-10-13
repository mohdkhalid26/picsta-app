import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { logoutUser } from "../../../services/auth";
import AuthContext from "../../../context/AuthContext";
import { Link } from "react-router-dom";

function LeftSidebar() {
  const { user, setAuth } = useContext(AuthContext);
  async function handleLogout(e) {
    e.preventDefault();
    try {
      const data = await logoutUser();
      if (data.message) {
        toast.success(data.message);
        setAuth(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="w-1/5 h-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className=" w-full h-full flex items-center justify-start flex-col border-r border-[#A89BDB]">
          <div className=" w-full flex items-start justify-center flex-col gap-4">
            <div className=" w-full pl-[29%]  pt-2  flex items-start justify-start flex-col">
              <div className=" flex items-center justify-center flex-col gap-1">
                <Link
                  to="/profile"
                  className=" leading-none text-sm text-[#A89BDB]  montserrat_regular font-bold underline mb-3"
                >
                  Edit
                </Link>
                <img
                  src={user?.profileImage}
                  alt="dp"
                  className=" w-[70px] h-[70px] rounded-[50%]"
                />
                <span className=" leading-none text-base  pacifico_heading font-bold text-[#A89BDB]">
                  {user?.fullname}
                </span>
              </div>
            </div>
            <Link
              to="/updatepassword"
              className=" w-full pl-[29%] border-y py-2 border-[#A89BDB] leading-none text-sm  montserrat_regular font-bold text-[#A89BDB] cursor-pointer hover:underline"
            >
              Change Password
            </Link>
            <span
              onClick={handleLogout}
              className=" w-full pl-[29%] border-y py-2 border-[#A89BDB] leading-none text-sm  montserrat_regular font-bold text-[#A89BDB] cursor-pointer hover:underline"
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
