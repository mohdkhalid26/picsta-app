import React from "react";
import { IoMail } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../../../public/logo.png";

function Forgot() {
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "" });
  function handleSubmit(e) {
    e.preventDefault();
    console.log(state);
  }
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const inputCss =
    " w-full leading-none text-sm  montserrat_regular font-medium  py-2 pl-2 pr-[36px] rounded-[8px] focus:outline-none focus:text-[#A89BDB] focus:bg-[#E6E1FF] text-[#A89BDB] border border-[#A89BDB] bg-[#E6E1FF] placeholder-white active:outline-none active:bg-[#E6E1FF] active:text-[#A89BDB] media-max-468px:text-xs";

  return (
    <div className="forgot-password-main w-screen h-screen flex items-center justify-center ">
      <div className="forgot-password-container h-full max-w-[1600px] w-full flex items-center justify-center">
        <div className="forgot-password w-[88%] h-full flex items-center justify-center">
          <div className="  h-[410px] border-[#A89BDB] border-2 rounded-2xl flex items-center justify-center overflow-hidden media-max-468px:h-[320px] media-max-408px:flex-col media-max-408px:h-auto media-max-408px:w-full">
            <div className=" flex items-center justify-center flex-col bg-[#A89BDB] h-full px-5 gap-2 media-max-482px:px-3 media-max-408px:w-full media-max-408px:py-3 media-max-408px:px-0">
              <span className=" w-[60px] h-[60px] rounded-[50%] bg-white flex items-center justify-center media-max-468px:w-[42px] media-max-468px:h-[42px] ">
                <img className=" w-full h-full" alt="logo" src={logo} />
              </span>
              <h1 className=" pacifico_heading text-[34px] leading-none text-center text-white media-max-468px:text-[29px]">
                Picsta
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className=" flex items-center justify-center flex-col gap-5 w-[25vw] px-5 media-max-1144px:w-[29vw] media-max-986px:w-[34vw] media-max-842px:w-[43vw] media-max-666px:w-[52vw] media-max-550px:w-[61vw] media-max-482px:px-3 media-max-468px:gap-3 media-max-408px:w-full media-max-408px:py-3"
            >
              <div className=" w-full relative flex items-center justify-center ">
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

              <button
                type="submit"
                className=" text-sm montserrat_regular font-medium bg-[#A89BDB] py-2 px-8 text-white   rounded-[8px] media-max-468px:text-xs"
              >
                Forgot
              </button>
              <div className=" w-full flex items-center justify-center flex-col gap-4 mt-8 media-max-468px:gap-2">
                <div className=" w-full flex items-center justify-center   text-[#A89BDB]  gap-4">
                  <span className=" leading-none pacifico_heading text-base media-max-468px:text-sm">
                    Back to login ?
                  </span>
                  <span
                    onClick={() => navigate("/")}
                    className=" leading-none montserrat_regular font-bold text-sm cursor-pointer hover:underline media-max-468px:text-xs"
                  >
                    Sign In
                  </span>
                </div>
                <div className=" w-full flex items-center justify-center mt-1 relative">
                  <span className=" absolute w-full border border-[#A89BDB]"></span>
                  <span className=" absolute px-1 bg-white text-[#A89BDB] montserrat_regular leading-none font-bold text-sm  media-max-468px:text-xs">
                    OR
                  </span>
                </div>
                <div className=" w-full flex items-center justify-center text-[#A89BDB]  gap-4">
                  <span className=" pacifico_heading text-base media-max-468px:text-sm leading-none">
                    Don't have an account ?
                  </span>
                  <span
                    onClick={() => navigate("/signup")}
                    className=" leading-none montserrat_regular font-bold text-sm cursor-pointer hover:underline media-max-468px:text-xs"
                  >
                    Sign Up
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
