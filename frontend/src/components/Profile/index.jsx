import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getSpecificUser } from "../../services/profile";
import AuthContext from "../../context/AuthContext";
import AllPost2 from "./allPost2";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error] = useState(null);

  const getUserProfile = async () => {
    try {
      const data = await getSpecificUser();
      setProfile(data);
    } catch (error) {}
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className=" w-[80%] flex items-center justify-start flex-col h-full relative p-2">
      <div className=" w-full flex items-center justify-center flex-col">
        <h1 className=" pacifico_heading text-white text-2xl bg-[#A89BDB] w-full rounded-t-lg text-center p-2">
          Profile
        </h1>
        {error ? (
          <p>Error: {error}</p>
        ) : profile ? (
          <div className=" w-full  montserrat_regular border-x border-[#A89BDB] px-2 py-6 flex items-start justify-center relative gap-16">
            <div className=" flex items-center justify-center flex-col gap-2">
              <img
                src={user?.profileImage}
                className=" w-20 h-20 rounded-[50%]"
                alt="dp"
              />
              <button
                onClick={() => navigate("/profile/edit")}
                className=" text-xs font-medium py-1 rounded-sm bg-[#A89BDB] text-white w-32"
              >
                Edit Profile
              </button>
            </div>
            <div className=" flex items-start justify-between flex-col h-full">
              <p className=" flex items-center justify-start gap-1 ">
                <span className=" text-sm font-bold text-[#A89BDB]">Name:</span>
                <span className=" text-sm text-[#A89BDB]">
                  {profile?.fullname}
                </span>
              </p>
              <p className=" flex items-center justify-start gap-1 ">
                <span className=" text-sm font-bold text-[#A89BDB]">
                  Username:
                </span>
                <span className=" text-sm text-[#A89BDB]">
                  {profile?.username}
                </span>
              </p>
              <p className=" flex items-center justify-start gap-1 ">
                <span className=" text-sm font-bold text-[#A89BDB]">
                  Email:
                </span>
                <span className=" text-sm text-[#A89BDB]">
                  {profile?.email}
                </span>
              </p>
              <p className=" flex items-center justify-start gap-1">
                <span className=" text-sm font-bold text-[#A89BDB]">
                  Tagline:
                </span>
                {profile?.tagline ? (
                  <span className=" text-sm text-[#A89BDB]">
                    {profile?.tagline}
                  </span>
                ) : (
                  <span
                    onClick={() => navigate("/profile/edit")}
                    className=" text-sm text-[#A89BDB] underline cursor-pointer"
                  >
                    {"Add Tagline"}
                  </span>
                )}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
      <AllPost2 />
    </div>
  );
};

export default Profile;
