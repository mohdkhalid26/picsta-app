import { useNavigate } from "react-router";
import { useFormHook } from "../../../hooks/useFormHook";
import { signUpUser } from "../../../services/auth";
import React, { useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoMail, IoEye, IoEyeOff } from "react-icons/io5";
import logo from "../../../../public/logo.png";
import toast from "react-hot-toast";
const defaultState = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmpassword: "",
  tagline:"",
};
function Signup() {
  const navigate = useNavigate();
  const { state, handleSubmit, handleFormData } = useFormHook(
    defaultState,
    navigate,
    signUpUser
  );
  const [passwordCondition, setPasswordCondition] = useState({
    password1: "password",
    password2: "password",
  });
  const [eyeCondition, setEyeCondition] = useState({
    eye1: "block",
    eye2: "hidden",
    eye3: "block",
    eye4: "hidden",
  });

  const inputCss =
    " w-full leading-none text-sm  montserrat_regular font-medium  py-2 pl-2 pr-[36px] rounded-[8px] focus:outline-none focus:text-[#A89BDB] focus:bg-[#E6E1FF] text-[#A89BDB] border border-[#A89BDB] bg-[#E6E1FF] placeholder-white active:outline-none active:bg-[#E6E1FF] active:text-[#A89BDB] media-max-468px:text-xs";
  function handleEyeAndPasswordCondition(param) {
    if (param === "eye1") {
      setPasswordCondition({ ...passwordCondition, password1: "text" });
      setEyeCondition({ ...eyeCondition, eye1: "hidden", eye2: "block" });
    } else if (param === "eye2") {
      setPasswordCondition({ ...passwordCondition, password1: "password" });
      setEyeCondition({ ...eyeCondition, eye1: "block", eye2: "hidden" });
    } else if (param === "eye3") {
      setPasswordCondition({ ...passwordCondition, password2: "text" });
      setEyeCondition({ ...eyeCondition, eye3: "hidden", eye4: "block" });
    } else if (param === "eye4") {
      setPasswordCondition({ ...passwordCondition, password2: "password" });
      setEyeCondition({ ...eyeCondition, eye3: "block", eye4: "hidden" });
    }
  }

  function handleSubmit2(e) {
    e.preventDefault();
    if (state.password === state.confirmpassword) {
      handleSubmit(e);
    } else {
      toast.error("Password & Confirm Password are not same.");
    }
  }

  return (
    <div className="sign-up-main w-screen h-screen flex items-center justify-center ">
      <div className="sign-up-container h-full max-w-[1600px] w-full flex items-center justify-center">
        <div className="sign-up w-[88%] h-full flex items-center justify-center">
          <div className="  h-[410px] media-max-468px:h-[320px] border-[#A89BDB] border-2 rounded-2xl flex items-center justify-center overflow-hidden media-max-408px:flex-col media-max-408px:h-auto media-max-408px:w-full">
            <div className=" flex items-center justify-center flex-col bg-[#A89BDB] h-full px-5 gap-2 media-max-494px:px-3 media-max-408px:w-full media-max-408px:py-3 media-max-408px:px-0">
              <span className=" w-[60px] h-[60px] media-max-468px:w-[42px] media-max-468px:h-[42px] rounded-[50%] bg-white flex items-center justify-center ">
                <img className=" w-full h-full" alt="logo" src={logo} />
              </span>

              <h1 className=" pacifico_heading text-[34px] media-max-468px:text-[29px] leading-none text-center text-white">
                Picsta
              </h1>
            </div>
            <form
              onSubmit={handleSubmit2}
              className=" flex items-center justify-center flex-col gap-5 w-[25vw] media-max-1186px:w-[29vw] media-max-1022px:w-[34vw] media-max-872px:w-[43vw] media-max-690px:w-[52vw] media-max-570px:w-[61vw] px-5 media-max-494px:px-3 media-max-468px:gap-3 media-max-408px:w-full media-max-408px:py-3"
            >
              <div className=" w-full relative flex items-center justify-center">
                <FaUser className=" absolute right-2 text-base text-[#A89BDB] media-max-468px:text-sm" />
                <input
                  value={state.fullname}
                  name="fullname"
                  required
                  type="text"
                  placeholder="Full Name"
                  className={` ${inputCss} `}
                  onChange={(e) => handleFormData(e)}
                />
              </div>
              <div className=" w-full relative flex items-center justify-center">
                <FaUserCircle className=" absolute right-2 text-lg text-[#A89BDB] media-max-468px:text-base" />
                <input
                  value={state.username}
                  name="username"
                  required
                  type="text"
                  placeholder="User Name"
                  className={` ${inputCss} `}
                  onChange={(e) => handleFormData(e)}
                />
              </div>
              <div className=" w-full relative flex items-center justify-center">
                <IoMail className=" absolute right-2 text-lg text-[#A89BDB] media-max-468px:text-base" />
                <input
                  value={state.email}
                  name="email"
                  required
                  type="email"
                  placeholder="Email"
                  className={` ${inputCss} `}
                  onChange={(e) => handleFormData(e)}
                />{" "}
              </div>
              <div className=" w-full relative flex items-center justify-center">
                <IoEye
                  onClick={() => handleEyeAndPasswordCondition("eye2")}
                  className={` ${eyeCondition.eye2} absolute right-2 text-lg text-[#A89BDB] cursor-pointer media-max-468px:text-base`}
                />
                <IoEyeOff
                  onClick={() => handleEyeAndPasswordCondition("eye1")}
                  className={` ${eyeCondition.eye1} absolute right-2 text-lg text-[#A89BDB] cursor-pointer media-max-468px:text-base`}
                />
                <input
                  value={state.password}
                  name="password"
                  required
                  type={passwordCondition.password1}
                  placeholder="Password"
                  className={` ${inputCss} `}
                  onChange={(e) => handleFormData(e)}
                />{" "}
              </div>
              <div className=" w-full relative flex items-center justify-center">
                <IoEye
                  onClick={() => handleEyeAndPasswordCondition("eye4")}
                  className={`${eyeCondition.eye4} absolute right-2 text-lg text-[#A89BDB] cursor-pointer media-max-468px:text-base`}
                />
                <IoEyeOff
                  onClick={() => handleEyeAndPasswordCondition("eye3")}
                  className={`${eyeCondition.eye3} absolute right-2 text-lg text-[#A89BDB] cursor-pointer media-max-468px:text-base`}
                />
                <input
                  value={state.confirmpassword}
                  name="confirmpassword"
                  required
                  type={passwordCondition.password2}
                  placeholder="Confirm Password"
                  className={` ${inputCss} `}
                  onChange={(e) => handleFormData(e)}
                />{" "}
              </div>
              <button
                type="submit"
                className=" text-sm montserrat_regular font-medium bg-[#A89BDB] py-2 px-8 text-white   rounded-[8px] media-max-468px:text-xs"
              >
                {state.isLoading ? "Registering..." : "Sign Up"}
              </button>

              <div className=" w-full flex items-center justify-center   text-[#A89BDB]  gap-4">
                <span className=" pacifico_heading text-base media-max-468px:text-sm">
                  Already have an account ?
                </span>
                <span
                  onClick={() => navigate("/")}
                  className=" montserrat_regular font-bold text-sm cursor-pointer hover:underline media-max-468px:text-xs"
                >
                  Sign In
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
