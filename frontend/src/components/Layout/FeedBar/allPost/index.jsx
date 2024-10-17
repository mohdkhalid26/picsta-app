import React, { useContext } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import "./style.scss";
import img1 from "../../../../../public/img1.jpeg";
import img2 from "../../../../../public/img2.jpg";
import img3 from "../../../../../public/img3.jpeg";
import AuthContext from "../../../../context/AuthContext";
function AllPost() {
  const { user } = useContext(AuthContext);
  const arr = [img1, img2, img3];
  return (
    <div className="all-post w-3/4 flex items-center justify-start flex-col gap-8 overflow-x-hidden overflow-y-scroll montserrat_regular text-white">
      {arr?.map((data, i) => {
        return (
          <div
            key={i}
            className="post w-full flex items-center justify-center flex-col gap-2 pb-4 border-b border-b-[#A89BDB] "
          >
            <div className="id-info-div w-full flex items-center justify-start gap-2 relative text-[#A89BDB] ">
              <img
                src={user?.profileImage}
                className=" w-8 h-8 rounded-[50%]"
                alt="dp"
              />
              <span className=" text-xs font-medium">{user?.username}</span>
              <span className=" absolute right-0 text-2xl cursor-pointer">
                <HiOutlineDotsHorizontal />
              </span>
            </div>
            <img src={data} alt="post img" className=" w-full " />
            <p className=" text-sm  text-[#A89BDB] font-medium  text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              doloremque iusto voluptatem officia nisi cupiditate amet tempore
              odit ut eaque aliquam ipsa, harum beatae sunt? Cumque consectetur
              nemo nostrum eligendi aperiam voluptatum.
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default AllPost;
