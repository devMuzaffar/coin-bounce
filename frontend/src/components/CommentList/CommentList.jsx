import Comment from "../Comment/Comment";

/* eslint-disable react/prop-types */
const CommentList = ({comments}) => {
  return (
    <div className="flex flex-col w-[90%]">
        <div className="h-[60vh] overflow-y-auto">
        {comments.length === 0 ? (<div className="text-[#bebcc0] font-bold flex items-center justify-center h-full w-full">
            No comments posted
        </div>) : comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
        ))}
        </div>
    </div>
  )
}

export default CommentList