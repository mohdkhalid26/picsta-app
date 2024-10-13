import "./style.scss";
const UploadModal = ({ imagePreview, onUpload, setCaption, closeModal }) => {
  const handleShare = () => {
    const captionInput = document.querySelector(".caption-input");
    const caption = captionInput.value; // Get the caption value
    setCaption(caption); // Update the caption state in FeedBar
    onUpload(caption); // Call onUpload with the caption
  };

  return (
    <div className="modal-for-add-post w-full h-full bg-[rgba(168,155,219,0.25)] fixed top-0 left-0 flex items-center justify-center">
      <div className="modal-content flex items-center justify-start flex-col w-1/4 bg-[#A89BDB] rounded-2xl px-2 py-3 gap-3 border-2 border-white">
        <div className=" w-full flex items-start justify-start relative">
          <img src={imagePreview} alt="Uploaded Preview" className=" w-1/4" />
          <span
            className="text-3xl leading-none text-white cursor-pointer absolute right-0 top-[-16%]"
            onClick={closeModal}
          >
            ×
          </span>
        </div>
        <textarea
          className="text-area-for-add-caption montserrat_regular bg-transparent border border-white rounded-2xl w-full h-20 resize-none focus:outline-none p-1 text-white text-xs font-medium placeholder-[rgba(255,255,255,0.40)]"
          placeholder="Write a caption..."
        />
        <button
          className=" bg-white px-8 py-1 rounded-lg text-[#A89BDB] montserrat_regular text-sm font-bold"
          onClick={handleShare}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
