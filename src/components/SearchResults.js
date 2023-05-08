import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchVideoCard from "./SearchVideoCard";
import ButtonList from "./ButtonList";
import { FETCH_SEARCH_RESULTS } from "../utils/apiCalls";

const SearchResults = () => {
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
    <div className={`px-8 py-2 ${darkMode && "bg-black"} `}>
      <ButtonList />
      <div className="">
        {data.map((video, index) => (
          <SearchVideoCard key={index} data={video} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
