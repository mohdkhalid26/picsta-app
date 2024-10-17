import React, { useContext } from "react";
import toast from "react-hot-toast";
import { logoutUser } from "../../../services/auth";
import AuthContext from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../../../../public/logo.png";
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
            <Link
              to="/"
              className="flex items-center justify-center flex-col mt-2 gap-1"
            >
              <span className=" w-[50px] h-[50px] rounded-[50%]  bg-[#A89BDB] flex items-center justify-center ">
                <img className=" w-full h-full" alt="logo" src={logo} />
              </span>
              <h1 className=" pacifico_heading text-[29px] leading-none text-center text-[#A89BDB]">
                Picsta
              </h1>
            </Link>

            <Link
              to="/"
              className=" w-full  py-2  leading-none text-sm  montserrat_regular font-bold text-[#A89BDB]  hover:underline"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className=" w-full flex items-start justify-start flex-col group"
            >
              <div className=" flex items-center justify-start gap-2">
                {/* <img
                  src={user?.profileImage}
                  alt="dp"
                  className=" w-[30px] h-[30px] rounded-[50%]"
                /> */}
                <span className=" leading-none text-sm montserrat_regular  font-bold text-[#A89BDB] group-hover:underline">
                  Profile
                </span>
              </div>
            </Link>
            <Link
              to="/updatepassword"
              className=" w-full  py-2  leading-none text-sm  montserrat_regular font-bold text-[#A89BDB] hover:underline"
            >
              Change Password
            </Link>
            <span
              onClick={handleLogout}
              className=" w-full py-2 leading-none text-sm  montserrat_regular font-bold text-[#A89BDB] cursor-pointer hover:underline"
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
