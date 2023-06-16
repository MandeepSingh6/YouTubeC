import React from "react";
import Moment from "react-moment";

const Comment = ({ data }) => {
  return (
    <div className="flex my-4">
      <img
        className="w-10 h-10 rounded-full"
        src={data.authorProfileImageUrl}
        alt="user-profile-image"
      />
      <div className="p-1 text-sm font-[500]">
        <div>
          <span className="font-[800]">{data.authorDisplayName} </span>
          <span className="pl-1 text-xs font-[450]">
            <Moment fromNow>{data.publishedAt}</Moment>
          </span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.textDisplay }}></div>
      </div>
    </div>
  );
};

export default Comment;
