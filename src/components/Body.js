import React, { useDebugValue, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { closeMenu, openMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Head from "./Head";

const Body = () => {
  const darkMode = useSelector((store) => store.app.darkMode);
  const menuOpen = useSelector((store) => store.app.isMenuOpen);
  const watchPageOpen = useSelector((store) => store.app.sidebarAbsolute);

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "bg-black" : ""}>
      <Head />
      <div className="flex ">
        {menuOpen && (
          <div
            className={
              "fixed top-[60px] bottom-0 w-[16%] overflow-scroll overscroll-none"
            }
          >
            <Sidebar />
          </div>
        )}

        <div
          className={
            watchPageOpen
              ? "p-5 mt-[60px]"
              : menuOpen
              ? "absolute left-[16%] right-0 top-[52px]"
              : "absolute left-10 right-10 top-[52px]"
          }
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;
