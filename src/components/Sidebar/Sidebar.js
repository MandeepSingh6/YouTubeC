import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../store/appSlice";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  const darkMode = useSelector((store) => store.app.darkMode);

  if (!isMenuOpen) return null;

  return (
    <div
      className={`pl-5 pr-1 pb-1" + ${
        darkMode ? "text-white bg-black" : " text-black bg-white"
      } `}
    >
      <ul className="leading-9 text-[15px] font-[400]">
        <Link to={"/"}>
          <li className="font-bold">Home</li>
        </Link>
        <li onClick={() => dispatch(setSearchQuery("shorts"))}>
          <Link to={"shorts"}>Shorts</Link>
        </li>
        <hr className="my-3" />
        <li className="font-bold">Explore</li>
        <li>
          <Link to={""}>Trending</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("music"))}>
          <Link to={"search"}>Music</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Movies & Shows"))}>
          <Link to={"search"}>Movies & Shows</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Live"))}>
          <Link to={"search"}>Live</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Gaming"))}>
          <Link to={"search"}>Gaming</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("News"))}>
          <Link to={"search"}>News</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Learning"))}>
          <Link to={"search"}>Learning</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Fashion & Beauty"))}>
          <Link to={"search"}>Fashion & Beauty</Link>
        </li>
        <hr className="my-3" />
        <li className="font-bold">More</li>
        <li onClick={() => dispatch(setSearchQuery("Science"))}>
          <Link to={"search"}>Science</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Cars"))}>
          <Link to={"search"}>Cars</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Marvel"))}>
          <Link to={"search"}>Marvel</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Hollywood"))}>
          <Link to={"search"}>Hollywood</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Crypto"))}>
          <Link to={"search"}>Crypto</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Football"))}>
          <Link to={"search"}>Football</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Boxing"))}>
          <Link to={"search"}>Boxing</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Tesla"))}>
          <Link to={"search"}>Tesla</Link>
        </li>
        <li onClick={() => dispatch(setSearchQuery("Weather"))}>
          <Link to={"search"}>Weather</Link>
        </li>

        <hr className="my-3" />
      </ul>
    </div>
  );
};

export default Sidebar;
