import React, { useContext } from "react";
import "./style.scss";
import img1 from "../../../../public/img1.jpeg";
import img2 from "../../../../public/img2.jpg";
import img3 from "../../../../public/img3.jpeg";
import AuthContext from "../../../context/AuthContext";
function RightSidebar() {
  const { user } = useContext(AuthContext);
  const arr = [
    img1,
    img2,
    img3,
    img1,
    img2,
    img3,
    img1,
    img2,
    img3,
    img1,
    img2,
    img3,
  ];
  return (
    <div className="w-1/4 h-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className=" w-full h-full flex items-center justify-start flex-col border-l gap-2 p-2 border-[#A89BDB]">
          <span className=" w-full text-right  leading-none text-xl py-1 pacifico_heading font-bold text-[#A89BDB]">
            Recent Posts
          </span>
          <div className="recent-posts w-full flex items-center justify-start flex-col gap-4 overflow-x-hidden overflow-y-scroll montserrat_regular text-white">
            {arr?.map((data, i) => {
              return (
                <div
                  key={i}
                  className="post w-full flex items-start justify-between cursor-pointer group"
                >
                  <div
                    className=" flex items-center justify-center w-20 h-20 rounded-[50%] overflow-hidden relative group-hover:scale-90
                    transition-all
                    duration-300
                    ease-in-out"
                  >
                    <img
                      src={data}
                      alt="post img"
                      className=" w-full h-full
                    "
                    />
                    <span className=" underline h-full w-full flex items-center justify-center bg-[rgba(0,0,0,0.25)] montserrat_regular text-xs font-bold absolute text-white opacity-0 group-hover:opacity-100">
                      Open
                    </span>
                  </div>
                  <div className=" flex items-end justify-end flex-col text-[#A89BDB] montserrat_regular text-xs font-bold h-full">
                    {/* <button
                      className="cursor-pointer underline opacity-0 group-hover:opacity-100 
                    transition-all
                    duration-500 
                    ease-in-out
                    "
                    >
                      Click For View
                    </button> */}
                    <span className=" group-hover:underline">14/10/2024</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
