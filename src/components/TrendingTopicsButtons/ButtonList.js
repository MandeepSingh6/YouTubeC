import React, { useRef, useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../store/appSlice";

const ButtonList = () => {
  const dispatch = useDispatch();
  const scrollMenu = useRef();
  const darkMode = useSelector((store) => store.app.darkMode);
  const [scroll, setScroll] = useState(0);

  const handleSetQuery = (query) => {
    dispatch(setSearchQuery(query));
  };
  const tags = [
    "Sports",
    "Action",
    "Food",
    "Nature",
    "Science",
    "Phones",
    "Live",
    "News",
    "Gaming",
    "Mountains",
    "Music",
    "Gadgets",
    "Dance",
    "News",
    "Gaming",
    "Mountains",
    "Music",
    "Gadgets",
    "Dance",
  ];

  const slide = (shift) => {
    scrollMenu.current.scrollLeft += shift;
  };

  return (
    <div className="relative ">
      <div
        className="w-[98%] sm:w-[94%] flex gap-[.7rem] justify-between mx-auto mt-2 mb-8 overflow-scroll scrollbar-hide scroll-smooth"
        ref={scrollMenu}
      >
        {scroll > 190 && (
          <button
            onClick={() => {
              slide(-200);
              setScroll((prev) => (prev -= 200));
            }}
            className={`absolute left-[-20px] sm:left-[-10px] top-1 " + ${
              darkMode && "text-white"
            }`}
          >
            ⬅
          </button>
        )}
        {tags.map((tag, index) => (
          <Link key={index} onClick={() => handleSetQuery(tag)} to={"/search"}>
            <Button name={tag} />
          </Link>
        ))}
        {scroll < 600 && (
          <button
            onClick={() => {
              slide(200);
              setScroll((prev) => (prev += 200));
            }}
            className={`absolute top-1 right-[-20px] sm:right-[-10px] rotate-180 " + ${
              darkMode && "text-white"
            }`}
          >
            ⬅
          </button>
        )}
      </div>
    </div>
  );
};

export default ButtonList;
