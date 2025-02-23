/* eslint-disable react/prop-types */
const Comment = ({ comment }) => {
  const date = new Date(comment.createdAt).toDateString();
  return (
    <div className="flex items-center justify-start gap-5 m-2.5 border-b-2 border-[#5b5b5b]">
      <div className="header">
        <div className="text-[#c4c5c5] font-bold mr-2.5 my-1">{comment.authorUsername}</div>
        <div className="text-sm text-[#c4c5c5] font-bold my-1">{date}</div>
        <div className="text-base py-1 my-1">{comment.content}</div>
      </div>
    </div>
  );
};

export default Comment;
