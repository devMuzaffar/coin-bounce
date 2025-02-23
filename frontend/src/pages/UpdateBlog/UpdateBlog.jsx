import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TextInput } from "../../components";
import { useNavigate, useParams } from "react-router";
import { getBlogById, updateBlog } from "../../api/internal";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const photoRef = useRef();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    (async () => {
      const response = await getBlogById(params.id);
      if (response.status === 200) {
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
        setPhoto(response.data.blog.photo);
      }
    })();
  }, []);

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const updateHandler = async () => {
    let data;
    if (photo.includes("http")) {
      data = {
        author: userId,
        title,
        content,
        blogId: params.id,
      };
    } else {
      data = {
        author: userId,
        title,
        content,
        blogId: params.id,
        photo,
      };
    }

    const response = await updateBlog(data);
    if (response.status === 200) {
      navigate("/");
    }
  };

  return (
    <div className="mx-auto w-[80vw] py-2 flex flex-col items-center justify-center">
      {/* header */}
      <div className="text-5xl font-bold w-[inherit] text-center py-8">
        Update your blog
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

      <div
        className="cursor-pointer flex justify-between items-center my-4 border-[1px] rounded-xl p-6 w-1/2 text-xl"
        onClick={() => photoRef.current.click()}
      >
        <p>Choose a photo</p>
        <input
          ref={photoRef}
          type="file"
          name="photo"
          accept="image/jpg, image/jpeg, image/png"
          onChange={getPhoto}
          hidden
        />
        {photo !== "" ? <img width={80} src={photo} /> : ""}
      </div>

      <button
        className="bg-[#3861fb] text-white border-none outline-none w-[30%] rounded-xl py-4 px-8 font-bold cursor-pointer my-2.5 hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-auto"
        onClick={updateHandler}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateBlog;
