import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonList from "../TrendingTopicsButtons/ButtonList";
import VideoContainer from "./VideoContainer";
import { closeMenu, openMenu } from "../../store/appSlice";

const MainContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.innerWidth < 900) {
      dispatch(closeMenu());
    }
  }, []);

  const darkMode = useSelector((store) => store.app.darkMode);
  return (
    <div className={`py-1 sm:px-6 sm:py-2 ${darkMode && "bg-black"}`}>
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
