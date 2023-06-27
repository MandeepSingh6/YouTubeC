import React, { useRef, useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../store/appSlice";

const ButtonList = () => {
  const dispatch = useDispatch();
  const scrollMenu = useRef();

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

  return (
    <div className="relative ">
      <div
        className="w-[100%] sm:w-[100%] flex gap-[.7rem] justify-between mx-auto mt-3 mb-8 overflow-scroll scrollbar-hide scroll-smooth"
        ref={scrollMenu}
      >
        {tags.map((tag, index) => (
          <Link key={index} onClick={() => handleSetQuery(tag)} to={"/search"}>
            <Button name={tag} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ButtonList;
