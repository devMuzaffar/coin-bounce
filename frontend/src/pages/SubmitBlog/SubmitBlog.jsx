import { useRef, useState } from "react";
import { submitaBlog } from "../../api/internal";
import { useSelector } from "react-redux";
import { TextInput } from "../../components";
import { useNavigate } from "react-router";

const SubmitBlog = () => {
  const navigate = useNavigate();
  const photoRef = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const state = useSelector(state => state.user._id);
  const photoDivStyle = "cursor-pointer flex justify-between items-center my-4 border-[1px] rounded-xl p-6 w-1/2 text-xl";

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const submitHandler = async () => {
    const data = {
      author,
      title,
      content,
      photo,
    };
    const response = await submitaBlog(data);
    if (response.status === 201) {
      navigate("/");
    }
  };

  return (
    <div className="mx-auto w-[80vw] py-2 flex flex-col items-center justify-center">
      {/* header */}
      <div className="text-5xl font-bold w-[inherit] text-center py-8">
        Create a blog
      </div>

      <TextInput
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        style={{ width: "50%" }}
      />
      <textarea
        className="py-4 px-8 m-4 outline-none w-1/2 border-[1px] border-[#fff] rounded-xl text-xl min-h-48"
        placeholder="your content goes here"
        maxLength={400}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        name="content"
      ></textarea>

      <div className={photoDivStyle} onClick={() => photoRef.current.click()}>
        <p>Choose a photo</p>
        <input
          ref={photoRef}
          type="file"
          name="photo"
          accept="image/jpg, image/jpeg, image/png"
          onChange={getPhoto}
          hidden
        />
        {photo !== '' ? <img width={80} src={photo} /> : ""}
      </div>

      <button
        className="bg-[#3861fb] text-white border-none outline-none w-[30%] rounded-xl py-4 px-8 font-bold cursor-pointer my-2.5 hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-auto"
        onClick={submitHandler}
        disabled={title === "" || content === "" || photo === ""}
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitBlog;
