import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrendingVideos } from "../utils/trendingVideosSlice";
import { FETCH_TRENDING_VIDEOS } from "../utils/apiCalls";

import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const data = useSelector((store) => store.trendingVideos.data);
  const disptach = useDispatch();

  useEffect(() => {
    if (data.length < 1) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const videos = await FETCH_TRENDING_VIDEOS();
    disptach(setTrendingVideos(videos));
  };

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 ">
      {data.map((video) => (
        <VideoCard key={video.id} data={video} />
      ))}
    </div>
  );
};

export default VideoContainer;
