import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, openMenu } from "../../store/appSlice";
import { formatNumber } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentsContainer from "../Comments/CommentsContainer";
import Moment from "react-moment";
import { makeSidebarAbsolute, makeSidebarRelative } from "../../store/appSlice";

import {
  FETCH_CHANNEL_DETAILS,
  FETCH_VIDEO_DATA,
  FETCH_RELATED_VIDEOS,
} from "../../utils/apiCalls";
import RelatedVideoCard from "./RelatedVideoCard";

const WatchPage = () => {
  const darkMode = useSelector((store) => store.app.darkMode);
  const [searchParams, setSearchParams] = useSearchParams();
  const link = searchParams.get("v");

  const [videoData, setVideoData] = useState([]);
  const [channelDetails, setChannelDetails] = useState("");
  const [relatedVidoes, setRelatedVideos] = useState([]);

  const { snippet, statistics } = videoData || "";
  const { title, channelTitle, channelId } = snippet || "";
  const { likeCount, viewCount } = statistics || "";

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
    fetchChannelDetails();
    fetchRelatedVideos();
    dispatch(makeSidebarAbsolute());

    dispatch(closeMenu());
    return () => {
      dispatch(openMenu());
      dispatch(makeSidebarRelative());
    };
  }, [link, title]);

  useEffect(() => {
    return () => {
      dispatch(closeMenu());
    };
  }, []);

  useEffect(() => {
    fetchChannelDetails();
  }, [videoData]);

  const fetchData = async () => {
    const data = await FETCH_VIDEO_DATA(link);
    setVideoData(data);
  };

  const fetchChannelDetails = async () => {
    const data = await FETCH_CHANNEL_DETAILS(channelId);
    setChannelDetails(data);
  };

  const fetchRelatedVideos = async () => {
    const data = await FETCH_RELATED_VIDEOS(link);
    setRelatedVideos(data);
  };

  return (
    <div className={darkMode ? "text-white" : ""}>
      <div className="gap-5 lg:flex ">
        <div className="">
          <div
            className={`w-full aspect-video xl:min-w-[840px] 2xl:min-w-[70vw] bg-black 3xl:min-w-[1400px] ${
              darkMode ? "bg-[#21201d]" : "bg-gray-400"
            }`}
          >
            <iframe
              className="w-full aspect-video"
              src={"https://www.youtube.com/embed/" + link + "?autoplay=1"}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
              allowFullScreen
            ></iframe>
          </div>
          <div>
            <p className="font-bold text-xl my-2">{title}</p>
            <div className="flex justify-between">
              <div className="flex gap-2">
                {channelDetails && (
                  <Link to={"/channel?id=" + channelId}>
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={channelDetails.snippet.thumbnails.default.url}
                      alt=""
                    />
                  </Link>
                )}
                <div>
                  <Link to={"/channel?id=" + channelId}>
                    <p className="font-bold">{channelTitle}</p>
                  </Link>
                  {channelDetails && (
                    <p className="text-[.8rem] font-medium">
                      {formatNumber(channelDetails.statistics.subscriberCount)}{" "}
                      Subscribers
                    </p>
                  )}
                  <span className="text-[.9rem] font-bold mt-4 block w-full ">
                    {viewCount && formatNumber(viewCount)} views
                    <span className="ml-2">
                      <Moment fromNow>{videoData?.snippet?.publishedAt}</Moment>
                    </span>
                  </span>
                </div>
              </div>
              <button className="cursor-default font-bold text-right bg-gray-200 px-4 h-10 rounded-full flex items-center gap-4">
                <img
                  className="w-5"
                  src="https://www.kindpng.com/picc/m/11-114955_transparent-like-icon-png-youtube-like-button-svg.png"
                  alt=""
                />
                <span className="text-regular text-black">
                  {likeCount && formatNumber(likeCount)}
                </span>
              </button>
            </div>
          </div>
          <CommentsContainer link={link} />
          <hr />
          <hr />
          <br />
        </div>
        <div className="">
          {relatedVidoes &&
            relatedVidoes.map((video) => (
              <div key={video.id.videoId}>
                {video.id.kind === "youtube#video" && (
                  <RelatedVideoCard data={video} />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
