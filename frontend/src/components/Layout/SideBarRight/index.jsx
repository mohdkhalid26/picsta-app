import React, { useContext } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import "./style.scss";
import img1 from "../../../../public/img1.jpeg";
import img2 from "../../../../public/img2.jpg";
import img3 from "../../../../public/img3.jpeg";
import AuthContext from "../../../context/AuthContext";
function RightSidebar() {
  const { user } = useContext(AuthContext);
  const arr = [img1, img2, img3];
  return (
    <div className="w-1/5 h-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className=" w-full h-full flex items-center justify-start flex-col border-l gap-2 p-2 border-[#A89BDB]">
          <span className=" w-full text-center pr-[29%] leading-none text-xl  pacifico_heading font-bold text-[#A89BDB]">
            Recent Posts
          </span>
          <div className="recent-posts w-full flex items-center justify-start flex-col gap-2 h-[85%] overflow-x-hidden overflow-y-scroll montserrat_regular text-white pr-[29%]">
            {arr?.map((data, i) => {
              return (
                <div
                  key={i}
                  className="post w-full flex items-center justify-center flex-col "
                  // p-2  rounded-[4px]  border border-[#A89BDB] gap-2
                >
                  {/* <div className="id-info-div w-full flex items-center justify-start gap-2 relative">
                    <img
                      src={user?.profileImage}
                      className=" w-4 h-4 rounded-[50%]"
                      alt="dp"
                    />
                    <span className=" text-[10px] text-[#A89BDB] font-bold">
                      {user?.username}
                    </span>
                    <span className=" absolute right-0 text-lgl text-[#A89BDB] cursor-pointer font-bold">
                      <HiOutlineDotsHorizontal />
                    </span>
                  </div> */}
                  <img src={data} alt="post img" className=" w-full" />
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
