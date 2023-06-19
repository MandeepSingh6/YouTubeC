import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchVideoCard from "../SearchPage/SearchVideoCard";
import ButtonList from "../TrendingTopicsButtons/ButtonList";
import { FETCH_SEARCH_RESULTS } from "../../utils/apiCalls";
import { closeMenu } from "../../store/appSlice";

const SearchResults = () => {
  const dispatch = useDispatch();
  const query = useSelector((store) => store.app.searchQuery);
  const darkMode = useSelector((store) => store.app.darkMode);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [query]);

  useEffect(() => {
    dispatch(closeMenu());
    return () => {
      dispatch(closeMenu());
    };
  }, []);

  const fetchData = async () => {
    const data = await FETCH_SEARCH_RESULTS(query);
    setData(data);
  };

  return (
    <div className={`sm:px-8 sm:py-2 ${darkMode && "bg-black"} `}>
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
