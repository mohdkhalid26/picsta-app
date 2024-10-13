import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import logo from "../../../../public/logo.png";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className=" navbar-main w-full flex items-center justify-center sticky top-0 left-0 bg-[#A89BDB] h-[64px]">
      <div className=" navbar-container max-w-[1600px] w-full flex items-center justify-center">
        <div className=" navbar w-[88%] flex items-center justify-between">
          <div className=" flex items-center justify-center gap-2">
            <span className=" w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center ">
              <img className=" w-full h-full" alt="logo" src={logo} />
            </span>
            <h1 className=" pacifico_heading text-[29px] leading-none text-center text-white">
              Picsta
            </h1>
          </div>
          <div className=" flex items-center justify-center gap-2">
            <Link to="/" className=" flex items-center justify-center text-[34px] text-white cursor-pointer">
              <MdHome />
            </Link>
            <div className=" flex items-center justify-center gap-2">
              <span className=" w-[30px] h-[30px] rounded-[50%] bg-white flex items-center justify-center overflow-hidden ">
                <img
                  className=" w-full h-full"
                  alt="dp"
                  src={user?.profileImage}
                />
              </span>
              <p className=" leading-none text-xs text-white  montserrat_regular font-medium">
                {user.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
