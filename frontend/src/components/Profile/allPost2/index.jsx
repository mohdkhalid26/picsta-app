import React, { useContext } from "react";
import "./style.scss";
import img1 from "../../../../public/img1.jpeg";
import img2 from "../../../../public/img2.jpg";
import img3 from "../../../../public/img3.jpeg";
import AuthContext from "../../../context/AuthContext";
function AllPost2() {
  const { user } = useContext(AuthContext);
  const arr = [img1, img2, img3, img1, img2, img3];
  return (
    <div className="all-post w-full flex items-start justify-center gap-x-[.5%] gap-y-1 flex-wrap  overflow-y-scroll montserrat_regular text-white">
      {arr?.map((data, i) => {
        return (
          <div
            key={i}
            className="post w-[33%] h-[270px] flex items-center justify-center relative group cursor-pointer"
          >
            {/* <div className="id-info-div w-full flex items-center justify-start gap-2 relative px-2 text-[#A89BDB] ">
              <img
                src={user?.profileImage}
                className=" w-8 h-8 rounded-[50%]"
                alt="dp"
              />
              <span className=" text-xs font-medium">{user?.username}</span>
              <span className=" absolute right-2 text-2xl cursor-pointer">
                <HiOutlineDotsHorizontal />
              </span>
            </div> */}
            <img
              src={data}
              alt="post img"
              className=" w-full h-full absolute"
            />
            <div
              className="overlay-div bg-[rgba(0,0,0,0.25)] absolute w-full h-full opacity-0 group-hover:opacity-100 
              transition-all duration-300 ease-in-out
              flex items-center justify-center underline text-base font-medium"
            >Open</div>
            {/* <p className=" text-sm  text-[#A89BDB] font-medium  text-justify px-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              doloremque iusto voluptatem officia nisi cupiditate amet tempore
              odit ut eaque aliquam ipsa, harum beatae sunt? Cumque consectetur
              nemo nostrum eligendi aperiam voluptatum.
            </p> */}
          </div>
        );
      })}
    </div>
  );
}

export default AllPost2;
