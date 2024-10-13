import { useState } from "react";
import UploadModal from "../../upload-modal";
import axios from "axios"; // Import Axios
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import AllPost from "./AllPost";

const FeedBar = () => {
  const [imagePreview, setImagePreview] = useState("/dp.jpg");
  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState(""); // State to hold caption

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl); // Set the preview image
      setShowModal(true); // Show the modal when an image is uploaded
    }
  };

  const handleUpload = async (caption) => {
    const formData = new FormData();
    const fileInput = document.getElementById("imageUpload");
    const file = fileInput.files[0]; // Get the actual file object

    if (file) {
      formData.append("image", file); // Append the actual file
      formData.append("caption", caption); // Append the caption

      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/upload",
          formData,
          {
            withCredentials: true, // Include cookies for authentication
          }
        );

        if (response.status === 200) {
          console.log(response.data); // Handle success (e.g., close modal, show success message)
          setShowModal(false); // Close the modal after successful upload
        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className=" w-3/5 h-full flex items-center justify-center">
      <div className=" w-full h-full flex items-center justify-center">
        <div className=" w-full h-full flex items-center justify-start flex-col p-2 gap-2">
          <div className=" w-full flex items-center justify-center flex-col">
            <label
              htmlFor="addPost"
              className=" flex items-center justify-center flex-col cursor-pointer group"
            >
              <MdOutlineAddPhotoAlternate className=" text-3xl text-[#A89BDB]" />
              <span className=" group-hover:underline montserrat_regular text-sm font-bold text-[#A89BDB]">
                Add Post
              </span>
            </label>
            <input
              type="file"
              id="addPost"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageUpload}
            />
            {showModal && (
              <UploadModal
                imagePreview={imagePreview}
                onUpload={handleUpload}
                setCaption={setCaption} // Pass the setter function to UploadModal
                closeModal={() => setShowModal(false)} // Pass closeModal function
              />
            )}
          </div>
          <AllPost/>
        </div>
      </div>
    </div>
  );
};

export default FeedBar;
