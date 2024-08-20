import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="p-3 shadow-lg rounded-lg bg-white">
      <img
        className="rounded-lg mb-2 w-full h-40 object-cover"
        alt="thumbnail"
        src={thumbnails.high.url}
      />
      <ul>
        <li className="font-bold">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} views</li>
      </ul>
    </div>
  );
};

export default VideoCard;
