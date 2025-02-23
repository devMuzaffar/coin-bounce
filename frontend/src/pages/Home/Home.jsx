import { useEffect, useState } from "react";
import { getNews } from "../../api/external";
import { Loader } from "../../components";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // an IIFE
    // Created & Executed at same time
    //
    (async function newsApiCall() {
      const response = await getNews();
      setArticles(response);
    })();

    // cleanup
    setArticles([]);
  }, []);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  return articles.length === 0 ? (
    <Loader text={"homepage"} />
  ) : (
    <div className="">
      {/* header */}
      <div className="text-4xl font-bold w-[inherit] text-center py-8">
        Latest Articles
      </div>

      {/* grid */}
      <div className="flex flex-wrap justify-center">
        {articles.map((article) => (
          <div
            key={article.url}
            className="bg-black border-[1px] border-white rounded-xl my-10 mx-5 cursor-pointer w-[20%] p-4 flex flex-col items-center justify-center"
            onClick={() => handleCardClick(article.url)}
          >
            <img
              className="rounded-xl w-full h-full"
              src={article.urlToImage}
              alt=""
            />
            <h3 className="text-left bg-transparent text-white mt-4">
              {article.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
