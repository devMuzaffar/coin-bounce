import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { deleteBlog, getBlogById, getCommentsById, postComment } from "../../api/internal";
import { CommentList, Loader } from "../../components";
import { useSelector } from "react-redux";

const BlogDetails = () => {

    const [blog, setBlog] = useState([]);
    const [comments, setComments] = useState([]);
    const [ownsBlog, setOwnsBlog] = useState(false);
    const [reload, setReload] = useState(false);
    const [newComment, setNewComment] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    const blogId = params.id;

    const username = useSelector(state => state.user.username);
    const userId = useSelector(state => state.user._id);

    // Use Effect
    useEffect(() => {
      (async () => {
        const commentResponse = await getCommentsById(blogId);
        if(commentResponse.status === 200){
          setComments(commentResponse.data.data);
        }
        const blogResponse = await getBlogById(blogId);
        if(blogResponse.status === 200){
          setOwnsBlog(username === blogResponse.data.blog.authorUsername);
          setBlog(blogResponse.data.blog);
        }
      })();
      
    }, [reload]);
    // default Reload
    
    // Post Comment
    const postCommentHandler = async () => {
      const data = {
        author: userId,
        blog: blogId,
        content: newComment
      };
      const response = await postComment(data);
      if(response.status === 201){
        setNewComment("");
        setReload(!reload);
      }
    }

    // Delete Blog
    const deleteBlogHandler = async () => {
      const response = await deleteBlog(blogId);
      if(response.status === 200){
        navigate('/');
      }
    }


  return blog.length === 0 ? (<Loader text={"Blog"} />) : (
    <div className="flex justify-between items-center gap-12 my-2.5 mx-12">

        {/* Left - Details */}
        <div className="flex flex-col w-[40%] justify-evenly items-center py-6">

          {/* Title */}
          <h1 className="title">{blog.title}</h1>

          {/* Meta */}
          <div className="flex gap-6 justify-start">
            <p>@{blog.authorUsername + " on " + new Date(blog.createdAt).toDateString()}</p>
          </div>

          {/* Image */}
          <div className="my-2.5 mx-auto">
            <img className="rounded-xl" src={blog.photo} width={250} height={250} alt="" />
          </div>

          {/* Content */}
          <p>{blog.content}</p>

          {/* Controls */}
          {
            ownsBlog && (
              <div className="flex w-full justify-end mt-5">
                {/* Edit Button */}
                <button className="ml-2.5 bg-[#16c784] text-white border-none outline-none rounded-xl py-2.5 px-4 font-bold h-fit hover:bg-[#17ae74]" onClick={() => navigate(`/blog/update/${blog.id}`)}>
                    Edit
                </button>
                {/* Delete Button */}
                <button className="ml-2.5 bg-[#ea3943] text-white border-none outline-none rounded-xl py-2.5 px-4 font-bold h-fit hover:bg-[#e01822]" onClick={deleteBlogHandler}>
                   Delete
                </button>
              </div>
            )
          }
        </div>

        {/* Right - Comments */}
        <div className="w-[40%] flex flex-col justify-between">

          {/* Wrapper */}
          <div className="commentsWrapper">

            {/* List of Comments */}
            <CommentList comments={comments} />

            {/* Post a Comment */}
            <div className="flex items-center justify-center">

              {/* Input */}
              <input className="border-none py-2.5 px-5 text-[#bebcc0] text-lg rounded-xl outline-none my-4 mx-2.5 border-[1px] border-white flex-1" placeholder="comment goes here..." value={newComment} onChange={(e) => setNewComment(e.target.value)} type="text" />

              {/* Post button */}
              <button className="bg-[#3861fb] text-white border-none outline-none cursor-pointer text-base py-2.5 px-10 h-fit rounded-xl hover:bg-[#1f4ffd]" onClick={postCommentHandler}>Post</button>

            </div>
          </div>
        </div>

    </div>
  )
}

export default BlogDetails