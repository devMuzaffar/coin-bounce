import { useEffect, useState } from "react"
import { getAllBlogs } from "../../api/internal";
import { Loader } from "../../components";
import { useNavigate } from "react-router";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      
      (async () => {
        const response = await getAllBlogs();
        if(response.status === 200){
            setBlogs(response.data.blogs);
        }
      })();
    
      setBlogs([]);
    }, []);
    


  return blogs.length === 0 ? <Loader text={"Blogs"} /> : (
    <div className="flex flex-wrap flex-col items-center gap-12 my-12">

        {/* Blogs */}
        {blogs.map(({id, content, title, photo}) => (
            <div className="bg-black border-[1px] border-white rounded-xl w-[80%] p-4 my-10 mx-5 cursor-pointer flex flex-col items-center justify-center group" key={id} onClick={() => navigate(`/blog/${id}`)}>
                <h1 className="text-left text-2xl font-bold mb-4 bg-transparent text-white group-hover:text-[#3861fb]">{title}</h1>
                <img width={300} height={300} className="rounded-xl" src={photo}/>
                <p className="mt-5 font-bold">{content}</p>
            </div>
        ))}

    </div>
  )
}

export default Blog