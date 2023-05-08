import React from "react";
import { useSelector } from "react-redux";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  const darkMode = useSelector((store) => store.app.darkMode);
  return (
    <div className={`px-8 py-2 ${darkMode && "bg-black"}`}>
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
