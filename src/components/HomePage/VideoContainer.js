import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrendingVideos } from "../../store/trendingVideosSlice";
import { FETCH_TRENDING_VIDEOS } from "../../utils/apiCalls";

import VideoCard from "./HomePageVideoCard";

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
    <div className="grid gap-2 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 ">
      {data.map((video) => (
        <VideoCard key={video.id} data={video} />
      ))}
    </div>
  );
};

export default VideoContainer;
