import { useContext, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { uploadUserProfileImage } from "../../../services/profile";
import AuthContext from "../../../context/AuthContext";
const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(user?.profileImage);
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname,
    username: user?.username,
  });
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      const formData = new FormData();
      formData.append("image", file);
      try {
        const { data } = await uploadUserProfileImage(formData);
        setUser((prevUser) => ({
          ...prevUser,
          profileImage: `${data.profileImage}`,
        }));
        console.log("Image uploaded successfully:", data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  function handleFormData2(e) {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  }
  function handleSubmit2(e) {
    e.preventDefault();
    console.log(profileData);
    console.log(user);
  }
  return (
    <>
      <div className=" w-[80%] h-full flex items-start justify-center">
        <form
          onSubmit={handleSubmit2}
          className=" border-2 border-[#A89BDB] flex items-center justify-center flex-col p-2 gap-2 mt-[14%]"
        >
          <div className="flex items-center justify-center relative">
            <img src={`${profileImage}`} alt="Profile" className=" w-20 h-20" />
            <label
              htmlFor="imageUpload"
              className=" absolute bottom-0 right-0 bg-[#A89BDB] rounded-[50%] text-white text-lg cursor-pointer"
            >
              <GoPlusCircle />
            </label>
            <input
              type="file"
              id="imageUpload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleProfileImageUpload}
            />
          </div>
          <div className=" w-full flex items-center justify-center">
            <input
              value={profileData.fullname}
              name="fullname"
              required
              type="text"
              placeholder="Full Name"
              className=" leading-none text-sm  montserrat_regular font-medium p-2 focus:outline-none focus:text-[#A89BDB] focus:bg-[#E6E1FF] text-[#A89BDB] bg-[#E6E1FF] placeholder-white "
              onChange={(e) => handleFormData2(e)}
            />
          </div>
          <div className=" w-full flex items-center justify-center">
            <input
              value={profileData.username}
              name="username"
              required
              type="text"
              placeholder="User Name"
              className=" leading-none text-sm  montserrat_regular font-medium p-2 focus:outline-none focus:text-[#A89BDB] focus:bg-[#E6E1FF] text-[#A89BDB] bg-[#E6E1FF] placeholder-white "
              onChange={(e) => handleFormData2(e)}
            />
          </div>

          <button
            type="submit"
            className=" text-xs montserrat_regular font-bold bg-[#A89BDB] py-2 px-8 text-white "
          >
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
