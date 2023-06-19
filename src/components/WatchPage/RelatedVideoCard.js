import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import { FETCH_LOGO, FETCH_VIDEO_DATA } from "../../utils/apiCalls";
import { formatNumber } from "../../utils/constants";
import { YTDurationToTime } from "../../utils/constants";
import { useSelector } from "react-redux";

const RelatedVideoCard = ({ data }) => {
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]);
  const { title, channelTitle, description, thumbnails, channelId } =
    data.snippet;
  const id = data.id.videoId;
  const darkMode = useSelector((store) => store.app.darkMode);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await FETCH_VIDEO_DATA(id);
    setVideoData(data);
  };

  return (
    <div className={darkMode ? "text-white" : ""}>
      <div onClick={() => navigate("/watch?v=" + id)}>
        {/* <Link to={"/watch?v=" + id} className="flex gap-2 mb-4 mr-4 max-h[92px]"> */}
        <div className="relative">
          <img
            className="max-w-[165px] h-[92px] rounded-xl"
            src={thumbnails.medium.url}
            // src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
          />
          <div className="absolute right-1.5 rounded-md px-0.5 font-bold bottom-1 text-white bg-black text-xs">
            {videoData &&
              videoData.contentDetails &&
              YTDurationToTime(videoData.contentDetails?.duration)}
          </div>
        </div>
        <div className="">
          <p className="text-sm  font-bold">
            {title.length < 50 ? title : title?.slice(0, 40) + "..."}
          </p>{" "}
          <Link to={"/channel?id=" + channelId}>
            <p className="text-xs py-1">{channelTitle}</p>
          </Link>
          <p className="text-xs">
            {videoData.statistics &&
              formatNumber(videoData?.statistics?.viewCount) + " Views"}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {videoData.snippet && (
              <Moment fromNow>{videoData?.snippet?.publishedAt}</Moment>
            )}
          </p>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default RelatedVideoCard;
