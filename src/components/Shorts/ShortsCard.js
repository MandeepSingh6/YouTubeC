import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import { useSelector } from "react-redux";
import CommentsContainer from "../Comments/CommentsContainer";
import {
  FETCH_CHANNEL_DETAILS,
  FETCH_VIDEO_COMMENTS,
  FETCH_VIDEO_DATA,
} from "../../utils/apiCalls";
import { formatNumber } from "../../utils/constants";

const ShortsCard = ({ data }) => {
  const darkMode = useSelector((store) => store.app.darkMode);
  const [render, setRender] = useState(false);
  const [comments, setComments] = useState(false);
  const [logo, setLogo] = useState("");
  const [videoData, setVideoData] = useState([]);
  const [src, setSrc] = useState(
    "https://www.youtube.com/embed/" +
      data.id.videoId +
      "?autoplay=0&modestbranding=1&controls=0"
  );

  useEffect(() => {
    checkIfShort();
  }, []);

  const checkIfShort = async () => {
    const res = await fetch(
      "https://www.youtube.com/shorts/" + data.id.videoId
    );
    if (res.redirected === true) {
      return;
    } else {
      fetchVideoData();
      fetchChannelDetails();
      setRender(true);
    }
  };

  const fetchVideoData = async () => {
    const res = await FETCH_VIDEO_DATA(data.id.videoId);
    setVideoData(res);
  };

  const fetchChannelDetails = async () => {
    const res = await FETCH_CHANNEL_DETAILS(data.snippet.channelId);
    setLogo(res);
  };

  return (
    render && (
      <button
        className="cursor-default"
        onBlur={() => {
          setComments(false);
        }}
      >
        <div className="flex w-[350px] h-[630px] mx-auto mt-6 mb-[10rem] relative">
          <div className="relative">
            <div className="absolute top-[50%] h-1">
              <Waypoint
                onEnter={() => {
                  setSrc(
                    "https://www.youtube.com/embed/" +
                      data.id.videoId +
                      "?autoplay=1&modestbranding=1&controls=0"
                  );
                }}
                onLeave={() => {
                  setSrc(
                    "https://www.youtube.com/embed/" +
                      data.id.videoId +
                      "?autoplay=0&modestbranding=1&controls=0"
                  );
                  setComments(false);
                }}
              ></Waypoint>
            </div>
            <iframe
              className="rounded-xl "
              id="frame"
              width="350"
              height="630"
              src={src}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
              allowFullScreen
            ></iframe>
          </div>
          {videoData.statistics && (
            <div className="ml-2 flex flex-col items-center mt-[350px] bottom-0">
              <button
                className={`h-11 w-11 rounded-full border-2 mt-4 ${
                  darkMode && "bg-white"
                }`}
              >
                <img
                  className="w-[70%] mx-auto cursor-default"
                  src="https://img.icons8.com/ios/512/facebook-like--v1.png"
                  alt=""
                />
              </button>
              {videoData.statistics.likeCount &&
                formatNumber(videoData.statistics.likeCount)}
              <button
                onClick={() => {
                  setComments((prev) => !prev);
                  setSrc(
                    "https://www.youtube.com/embed/" +
                      data.id.videoId +
                      "?autoplay=0&modestbranding=1&controls=0&loop=1"
                  );
                }}
                className={`h-11 w-11 rounded-full border-2 mt-4 ${
                  darkMode && "bg-white"
                }`}
              >
                <img
                  className="w-[60%] mx-auto cursor-default"
                  src="https://img.icons8.com/ios/512/comments.png"
                  alt=""
                />
              </button>
              {videoData.statistics.commentCount &&
                formatNumber(videoData.statistics.commentCount)}
              <button className="h-11 w-11 rounded-full border-2 mt-4">
                <Link to={"/channel?id=" + data.snippet.channelId}>
                  <img
                    className="w-full mx-auto cursor-default rounded-full"
                    src={logo?.snippet?.thumbnails?.default?.url}
                    alt=""
                  />
                </Link>
              </button>
            </div>
          )}
          {comments && (
            <div className="absolute top-0 left-[-40%] right-0 bottom-0 overflow-scroll overscroll-none px-4 rounded-xl bg-gray-600">
              <CommentsContainer link={data.id.videoId} />
            </div>
          )}
        </div>
      </button>
    )
  );
};

export default ShortsCard;
