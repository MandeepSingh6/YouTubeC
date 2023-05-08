import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ChannelVideoCard from "./ChannelVideoCard";
import { FETCH_CHANNEL_DETAILS, FETCH_CHANNEL_VIDEOS } from "../utils/apiCalls";
import { formatNumber } from "../utils/constants";
import { useSelector } from "react-redux";

const ChannelPage = () => {
  const darkMode = useSelector((store) => store.app.darkMode);
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState();
  const [videos, setVideos] = useState();
  const id = searchParams.get("id");

  useEffect(() => {
    fetchChannelDetails();
    fetchChannelVideos();
  }, [id]);

  const fetchChannelDetails = async () => {
    const data = await FETCH_CHANNEL_DETAILS(id);
    setData(data);
  };
  const fetchChannelVideos = async () => {
    const data = await FETCH_CHANNEL_VIDEOS(id);
    setVideos(data);
  };
  return (
    <div className={`mt-[10px] ml-2 ${darkMode ? "text-white" : ""}`}>
      {data?.brandingSettings?.image && (
        <img
          className="w-full h-[192px] object-cover mb-6"
          src={
            data?.brandingSettings?.image?.bannerExternalUrl +
            "=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
          }
          alt=""
        />
      )}
      <div className="px-10">
        <div className="flex items-center gap-6">
          <div>
            <img
              className="min-w-[128px] h-[128px] rounded-full"
              src={data?.snippet?.thumbnails?.high?.url}
              alt=""
            />
          </div>
          <div className="font-bold text-[18px]">
            <p className="font-extrabold text-[24px] ">
              {data?.snippet?.title}
            </p>
            <span className="">{data?.snippet?.customUrl}</span>
            &nbsp; &nbsp;
            <span className="">
              {data?.statistics?.subscriberCount &&
                formatNumber(data?.statistics?.subscriberCount)}
              <span> subscribers</span>
            </span>
            {data?.snippet?.description ? (
              <p className="">
                {data?.snippet?.description.split("\n")[0].slice(0, 73)}
                {data?.snippet?.description.split("\n")[0].length > 73 && "..."}
              </p>
            ) : (
              <p>More about this channel</p>
            )}
          </div>
        </div>
        <div className="mt-6">
          {/* <ul className="flex justify-around font-bold">
            <li>HOME</li>
            <li>VIDEOS</li>
            <li>SHORTS</li>
            <li>LIVE</li>
            <li>PLAYLISTS</li>
            <li>COMMUNITY</li>
            <li>CHANNELS</li>
            <li>ABOUT</li>
          </ul>
          <hr /> */}
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 mt-6">
            {videos &&
              videos.map((video, index) => (
                <ChannelVideoCard key={index} data={video} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
