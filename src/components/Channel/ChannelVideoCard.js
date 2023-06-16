import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FETCH_THUMBNAIL_IMAGE } from "../../utils/apiCalls";

const ChannelVideoCard = ({ data }) => {
  console.log(data);
  const [thumbnail, setThumbnail] = useState();
  useEffect(() => {
    fetchThumbnailImg();
  }, []);

  const fetchThumbnailImg = async () => {
    const url = await FETCH_THUMBNAIL_IMAGE(data.id.videoId);
    setThumbnail(url);
  };

  return (
    data.id.kind === "youtube#video" && (
      <div>
        <Link to={"/watch?v=" + data.id.videoId}>
          <img
            className="rounded-xl max-w-full min-w-full"
            // src={
            //   data?.snippet?.thumbnails?.maxres
            //     ? data?.snippet?.thumbnails?.maxres?.url
            //     : data?.snippet?.thumbnails?.medium?.url
            // }
            src={thumbnail ? thumbnail : data?.snippet?.thumbnails?.medium?.url}
            alt=""
          />

          {/* <div className="relative">
          <div className="absolute right-1.5 rounded-sm px-0.5 font-bold bottom-1 text-white bg-black text-xs">
            {YTDurationToTime(contentDetails.duration)}
          </div>
        </div> */}

          <div className="p-2 pl-0 flex gap-2">
            <div>
              <b
                dangerouslySetInnerHTML={{
                  __html: data?.snippet?.title?.slice(0, 50),
                }}
              ></b>

              <div className="text-sm">
                {/* {formatNumber(viewCount)} views &nbsp;&nbsp;
              <span className="font-bold">﹒</span> */}

                <span>
                  {data.snippet && (
                    <Moment fromNow>{data?.snippet?.publishedAt}</Moment>
                  )}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  );
};

export default ChannelVideoCard;
