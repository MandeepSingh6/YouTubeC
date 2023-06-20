import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FETCH_CHANNEL_DETAILS } from "../../utils/apiCalls";
import { formatNumber, YTDurationToTime } from "../../utils/constants";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const HomePageVideoCard = ({ data }) => {
  const navigate = useNavigate();
  const { snippet, statistics, id, contentDetails } = data;
  const { title, thumbnails, channelTitle, publishedAt, channelId } = snippet;
  const { viewCount, likeCount } = statistics;
  const [logo, setLogo] = useState("");
  const darkMode = useSelector((store) => store.app.darkMode);

  const menuOpen = useSelector((store) => store.app.isMenuOpen);

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    const data = await FETCH_CHANNEL_DETAILS(channelId);
    setLogo(data.snippet.thumbnails.default.url);
  };

  return (
    <div className={darkMode ? "text-white" : ""}>
      <div onClick={() => navigate("watch?v=" + id)}>
        <div className="relative">
          <img
            className={`rounded-xl max-w-full min-w-full aspect-video`}
            src={
              thumbnails.maxres ? thumbnails.maxres.url : thumbnails.medium.url
            }
            alt=""
          />
          <div className="absolute right-1.5 rounded-sm px-0.5 font-bold bottom-1 text-white bg-black text-xs">
            {YTDurationToTime(contentDetails.duration)}
          </div>
        </div>
        <div className="p-2 pl-0 flex gap-2">
          <Link to={"channel?id=" + channelId}>
            <img
              className="min-w-[36px] h-[36px] rounded-full"
              src={logo}
              alt=""
            />
          </Link>
          <div className="flex flex-col gap-[3px]">
            <b>{title.length < 60 ? title : title?.slice(0, 60) + "..."}</b>
            <div>
              <Link to={"channel?id=" + channelId}>
                <div className="text-sm font-[550]">{channelTitle}</div>
              </Link>
              <div className="text-sm">
                {formatNumber(viewCount)} views &nbsp;&nbsp;
                <span className="font-bold">﹒</span>
                <span>
                  {snippet && <Moment fromNow>{snippet?.publishedAt}</Moment>}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageVideoCard;
