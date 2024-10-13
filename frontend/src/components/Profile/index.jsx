import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getSpecificUser } from "../../services/profile";
import AuthContext from "../../context/AuthContext";

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
    <div className=" w-[80%] flex items-center justify-center bg-slate-100 h-full relative ">
      <div className=" flex items-center justify-center flex-col absolute top-[29%]">
        <h1 className=" pacifico_heading text-white text-2xl bg-[#A89BDB] w-full rounded-t-lg text-center p-2">
          Profile
        </h1>
        {error ? (
          <p>Error: {error}</p>
        ) : profile ? (
          <div className=" montserrat_regular border border-[#A89BDB] rounded-b-lg p-2 flex items-start justify-center flex-col gap-1">
            <img
              src={user?.profileImage}
              className=" w-10 h-10 rounded-[50%]"
              alt="dp"
            />
            <p className=" flex items-center justify-start gap-1">
              <span className=" text-sm font-bold text-[#A89BDB]">Name:</span>
              <span className=" text-sm text-[#A89BDB]">
                {profile?.fullname}
              </span>
            </p>
            <p className=" flex items-center justify-start gap-1">
              <span className=" text-sm font-bold text-[#A89BDB]">
                Username:
              </span>
              <span className=" text-sm text-[#A89BDB]">
                {profile?.username}
              </span>
            </p>
            <p className=" flex items-center justify-start gap-1">
              <span className=" text-sm font-bold text-[#A89BDB]">Email:</span>
              <span className=" text-sm text-[#A89BDB]">{profile?.email}</span>
            </p>
            <button
              onClick={() => navigate("/profile/edit")}
              className=" text-xs font-medium py-1 px-3 rounded-sm bg-[#A89BDB] text-white mt-2"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
