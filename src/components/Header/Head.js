import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toogleMenu, toogleDarkMode } from "../../store/appSlice";
import { SUGGESTION_API } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cacheSuggestions } from "../../store/suggestionsSlice";
import { toogleSearchResults, setSearchQuery } from "../../store/appSlice";
import img from "../../assets/images/burger-bar.png";
import youtubeLogoLightTheme from "../../assets/images/youtube-logo-lighttheme.svg";
import youtubeLogoDarkTheme from "../../assets/images/youtube-logo-darktheme.svg";
import { closeMenu } from "../../store/appSlice";

const Head = () => {
  const darkMode = useSelector((store) => store.app.darkMode);
  const sun =
    "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg";
  const moon =
    "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg";
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const navigate = useNavigate();

  const storedSuggestions = useSelector((store) => store.suggestions);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input in storedSuggestions) {
        setSuggestions(storedSuggestions[input]);
      } else {
        fetchData();
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [input]);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 639) {
      setShowSearchBox(false);
    }
  });

  const fetchData = async () => {
    const res = await fetch(SUGGESTION_API + input);
    const data = await res.json();
    setSuggestions(data[1]);
    dispatch(cacheSuggestions({ [input]: suggestions }));
  };

  const handleToogle = () => {
    dispatch(toogleMenu());
  };
  const setQuery = (query) => {
    dispatch(setSearchQuery(query));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(closeMenu());
    setQuery(input);
    navigate("/search");
    setShowSuggestions(false);
  };

  return (
    <div
      className={`flex justify-between px-4 py-0 items-center w-[100vw] fixed ${
        !showSearchBox && "top-[-10px]"
      } left-0 z-10 ${darkMode ? "bg-black" : "bg-white"}`}
    >
      <div className="flex items-center">
        <div>
          <img
            className={`w-7 ${darkMode && "invert"}`}
            onClick={() => handleToogle()}
            src={img}
            alt="menu"
          />
        </div>
        <div>
          <Link to={"/"}>
            <img
              className={`w-28`}
              src={darkMode ? youtubeLogoDarkTheme : youtubeLogoLightTheme}
              alt="youtube"
            />
          </Link>
        </div>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className={`${
            showSearchBox ? "block" : "hidden"
          } min-w-[100vw] sm:min-w-0 sm:block my-2 sm:my-auto`}
        >
          {showSearchBox && (
            <button
              className={`mr-1 ${darkMode ? "text-white" : "text-black"}`}
              onClick={() => setShowSearchBox(false)}
            >
              ⬅
            </button>
          )}

          <input
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className={`border-2 p-1.5 rounded-l-full w-[80vw] sm:w-[40vw] relative + ${
              darkMode && "bg-black text-white border-[1px] border-[#222222]"
            }`}
            placeholder="Search"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          />
          {showSuggestions && (
            <ul className="absolute bg-white mt-1 min-w-[40vw] rounded-lg">
              {suggestions.map((suggestion, index) => (
                <Link to={"/search"} key={index}>
                  <li
                    onClick={() => {
                      setQuery(suggestion);
                    }}
                    className="hover:bg-gray-200 p-1 pl-2 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                </Link>
              ))}
            </ul>
          )}

          <span
            to={"/search"}
            onClick={() => {
              setQuery(input);
            }}
          >
            <button
              type="submit"
              className={`border-2 p-1.5 rounded-r-full w-[10vw] sm:w-[5vw] border-l-0  + ${
                darkMode && "bg-[#222222] border-[1px] border-[#222222]"
              }`}
            >
              🔍
            </button>
          </span>
        </form>
        {!showSearchBox && (
          <button className="sm:hidden" onClick={() => setShowSearchBox(true)}>
            🔍
          </button>
        )}
      </div>

      <button onClick={() => dispatch(toogleDarkMode())} className="w-6 h-6">
        {!darkMode && <img src={sun} alt="lightTheme" />}
        {darkMode && <img src={moon} alt="darkTheme" />}
      </button>
    </div>
  );
};

export default Head;
