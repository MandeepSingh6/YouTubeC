import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FETCH_SEARCH_RESULTS } from "../utils/apiCalls";
import ShortsCard from "./ShortsCard";

const ShortsWatchPage = () => {
  const query = useSelector((store) => store.app.searchQuery);
  const darkMode = useSelector((store) => store.app.darkMode);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [query]);

  const fetchData = async () => {
    const data = await FETCH_SEARCH_RESULTS(query);
    setData(data);
  };

  return (
    <div className={darkMode && "bg-black text-white"}>
      <div className="mt-2 w-[84vw] flex flex-col ">
        {data.map((video, index) => (
          <ShortsCard key={index} data={video} />
        ))}
      </div>
    </div>
  );
};

export default ShortsWatchPage;
