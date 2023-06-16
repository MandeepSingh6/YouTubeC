import React from "react";
import { useSelector } from "react-redux";
import ButtonList from "../TrendingTopicsButtons/ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  const darkMode = useSelector((store) => store.app.darkMode);
  return (
    <div className={`py-1 sm:px-8 sm:py-2 ${darkMode && "bg-black"}`}>
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
