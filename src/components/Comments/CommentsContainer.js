import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { FETCH_VIDEO_COMMENTS } from "../../utils/apiCalls";
import { useSelector } from "react-redux";

const CommentsContainer = ({ link }) => {
  const darkMode = useSelector((store) => store.app.darkMode);
  const [commentsData, setCommentsData] = useState(null);

  useEffect(() => {
    fetchVideoComments();
  }, [link]);

  const fetchVideoComments = async () => {
    const data = await FETCH_VIDEO_COMMENTS(link);
    setCommentsData(data);
  };

  return (
    <div className={darkMode ? "text-white" : ""}>
      <div className="my-4 mt-6 max-w-[940px] text-left ">
        <p className="text-[1.2rem] font-[400]">Comments</p>
        {commentsData &&
          commentsData.map((comment, index) => (
            <Comment
              key={index}
              data={comment.snippet.topLevelComment.snippet}
            />
          ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
