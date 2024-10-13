import { useFormHook } from "../../../hooks/useFormHook";
import { updatePwd } from "../../../services/auth";
import toast from "react-hot-toast";
import logo from "../../../../public/logo.png";
import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
const defaultState = {
  oldpassword: "",
  newpassword: "",
  confirmnewpassword: "",
};
const UpdatePassword = () => {
  const navigate = false;
  const { state, handleFormData, handleSubmit } = useFormHook(
    defaultState,
    navigate,
    updatePwd
  );
  const [passwordCondition, setPasswordCondition] = useState({
    password1: "password",
    password2: "password",
    password3: "password",
  });
  const [eyeCondition, setEyeCondition] = useState({
    eye1: "block",
    eye2: "hidden",
    eye3: "block",
    eye4: "hidden",
    eye5: "block",
    eye6: "hidden",
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
    } else if (param === "eye5") {
      setPasswordCondition({ ...passwordCondition, password3: "text" });
      setEyeCondition({ ...eyeCondition, eye5: "hidden", eye6: "block" });
    } else if (param === "eye6") {
      setPasswordCondition({ ...passwordCondition, password3: "password" });
      setEyeCondition({ ...eyeCondition, eye5: "block", eye6: "hidden" });
    }
  }
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (state.confirmnewpassword !== state.newpassword) {
      toast.error("Password Does not Match");
    } else {
      handleSubmit(e);
    }
  };
  return (
    <div className="update-password-main w-[80%] h-full flex items-center justify-center">
      <div className="update-password-container h-full w-full flex items-center justify-center">
        <div className="update-password h-full flex items-start mt-[88px] justify-center">
          <div className=" h-[410px] border-[#A89BDB] border-2 rounded-2xl flex items-center justify-center overflow-hidden media-max-468px:h-[320px] media-max-408px:flex-col media-max-408px:h-auto media-max-408px:w-full">
            <div className=" flex items-center justify-center flex-col bg-[#A89BDB] h-full px-5 gap-2 media-max-468px:px-3 media-max-408px:w-full media-max-408px:py-3 media-max-408px:px-0">
              <span className=" w-[60px] h-[60px] rounded-[50%] bg-white flex items-center justify-center media-max-468px:w-[42px] media-max-468px:h-[42px]">
                <img className=" w-full h-full" alt="logo" src={logo} />
              </span>

              <h1 className=" pacifico_heading text-[34px] leading-none text-center text-white media-max-468px:text-[29px]">
                Picsta
              </h1>
            </div>
            <form
              onSubmit={handleUpdatePassword}
              className=" flex items-center justify-center flex-col gap-5 w-[25vw] px-5 media-max-1114px:w-[29vw] media-max-962px:w-[34vw] media-max-820px:w-[43vw] media-max-648px:w-[52vw] media-max-536px:w-[61vw] media-max-468px:px-3 media-max-468px:gap-3 media-max-408px:w-full media-max-408px:py-3"
            >
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
                  value={state.oldpassword}
                  name="oldpassword"
                  required
                  type={passwordCondition.password1}
                  placeholder="Old Password"
                  className={` ${inputCss} `}
                  onChange={(e) => handleFormData(e)}
                />{" "}
              </div>
              <div className=" w-full relative flex items-center justify-center">
                <IoEye
                  onClick={() => handleEyeAndPasswordCondition("eye4")}
                  className={` ${eyeCondition.eye4} absolute right-2 text-lg text-[#A89BDB] cursor-pointer media-max-468px:text-base`}
                />
                <IoEyeOff
                  onClick={() => handleEyeAndPasswordCondition("eye3")}
                  className={` ${eyeCondition.eye3} absolute right-2 text-lg text-[#A89BDB] cursor-pointer media-max-468px:text-base`}
                />
                <input
                  value={state.newpassword}
                  name="newpassword"
                  required
                  type={passwordCondition.password2}
                  placeholder="New Password"
                  className={` ${inputCss} `}
                  onChange={(e) => handleFormData(e)}
                />{" "}
              </div>
              <div className=" w-full relative flex items-center justify-center">
                <IoEye
                  onClick={() => handleEyeAndPasswordCondition("eye6")}
                  className={` ${eyeCondition.eye6} absolute right-2 text-lg text-[#A89BDB] cursor-pointer media-max-468px:text-base`}
                />
                <IoEyeOff
                  onClick={() => handleEyeAndPasswordCondition("eye5")}
                  className={` ${eyeCondition.eye5} absolute right-2 text-lg text-[#A89BDB] cursor-pointer media-max-468px:text-base`}
                />
                <input
                  value={state.confirmnewpassword}
                  name="confirmnewpassword"
                  required
                  type={passwordCondition.password3}
                  placeholder="Confirm New Password"
                  className={` ${inputCss} `}
                  onChange={(e) => handleFormData(e)}
                />{" "}
              </div>
              <button
                type="submit"
                className=" text-sm montserrat_regular font-medium bg-[#A89BDB] py-2 px-8 text-white   rounded-[8px] media-max-468px:text-xs"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
