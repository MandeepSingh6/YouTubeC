import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FETCH_CHANNEL_DETAILS, FETCH_VIDEO_DATA } from "../../utils/apiCalls";
import { formatNumber, YTDurationToTime } from "../../utils/constants";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { FETCH_THUMBNAIL_IMAGE } from "../../utils/apiCalls";

const SearchVideoCard = ({ data }) => {
  const navigate = useNavigate();
  const darkMode = useSelector((store) => store.app.darkMode);
  const [logo, setLogo] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [videoData, setVideoData] = useState();
  const { title, channelTitle, description, thumbnails, channelId } =
    data.snippet;
  const { contentDetails, snippet, statistics } = videoData || "";
  const id = data.id.videoId;

  useEffect(() => {
    fetchVideoData();
  }, []);

  useEffect(() => {
    fetchLogo();
    fetchThumbnailImg();
  }, [data]);

  const fetchLogo = async () => {
    const data = await FETCH_CHANNEL_DETAILS(channelId);
    setLogo(data.snippet.thumbnails.default.url);
  };

  const fetchVideoData = async () => {
    const data = await FETCH_VIDEO_DATA(id);
    setVideoData(data);
  };

  const fetchThumbnailImg = async () => {
    const url = await FETCH_THUMBNAIL_IMAGE(id);
    setThumbnail(url);
  };

  return (
    <div className={darkMode ? "text-white" : ""}>
      <div
        onClick={() => navigate("/watch?v=" + id)}
        className="sm:flex md:gap-3 mb-5 sm:mr-16 "
      >
        <div className="relative">
          <img
            className="sm:max-w-[358px] h-[204px] rounded-xl"
            // src={
            //   thumbnails.maxres ? thumbnails.maxres.url : thumbnails.medium.url
            // }
            src={thumbnail ? thumbnail : thumbnails.medium.url}
            alt="thumbnail"
          />
          <div className="absolute right-1.5 rounded-sm px-0.5 font-bold bottom-1 text-white bg-black text-xs">
            {videoData && YTDurationToTime(contentDetails?.duration)}
          </div>
        </div>
        <div className="">
          <p
            className="text-xl"
            dangerouslySetInnerHTML={{ __html: title }}
          ></p>
          <span className="text-sm">
            {videoData &&
              statistics.viewCount &&
              formatNumber(statistics.viewCount) + " Views"}
            &nbsp; &nbsp;
          </span>
          <span className="text-sm">
            {videoData && snippet.publishedAt && (
              <Moment fromNow>{snippet.publishedAt}</Moment>
            )}
          </span>
          <div className="">
            <Link
              to={"/channel?id=" + channelId}
              className="flex gap-2 items-center"
            >
              <img
                src={logo}
                alt=""
                className="w-[32px] h-[32px] rounded-full"
              />
              <p className="text-sm py-3">{channelTitle}</p>
            </Link>
          </div>
          <p className="text-xs hidden sm:block">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchVideoCard;
