import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../utils/appSlice";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const sidebarAbsolute = useSelector((store) => store.app.sidebarAbsolute);
  const dispatch = useDispatch();

  const darkMode = useSelector((store) => store.app.darkMode);

  if (!isMenuOpen) return null;

  return (
    <div
      className={`pl-5 pr-1 pb-1 " + ${
        darkMode ? "text-white bg-black" : " text-black bg-white"
      }`}
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
        <li className="font-bold">More from YouTube</li>
        <li>YouTube Studio</li>
        <li>YouTube Music</li>
        <li>YouTube Kids</li>
        <hr className="my-3" />
        <li>Settings</li>
        <li>Report history</li>
        <li>Help</li>
        <li>Send feedback</li>
        <hr className="my-3" />
        <li className="text-sm">
          <a href="">About </a>
          <a href="">Press </a>
          <a href="">Copyright </a>
          <a href="">Contact us </a>
          <a href="">Creators </a>
          <a href="">Advertise </a>
          <a href="">Developers </a>
          <br />
          <a href="">Terms </a>
          <a href="">Privacy </a>
          <a href="">Policy & Safety </a>
          <a href="">How YouTube works </a>
          <a href="">Test new features </a>
        </li>
        <li>©️ 2023 Google LLC</li>
      </ul>
    </div>
  );
};

export default Sidebar;
