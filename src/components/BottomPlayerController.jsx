import React from "react";
import { useSelector } from "react-redux";

const BottomPlayerController = () => {
  const sharedSongState = useSelector(state => state.sharedState);

  return (
    <div className="flex flex-row items-center justify-between h-full">
      <div className="flex items-center gap-3 m-2">
        <div className="avatar">
          <div className="mask mask-squircle h-16 w-16">
            <img src={sharedSongState.album.picUrl} />
          </div>
        </div>
        <div className="truncate text-ellipsis max-w-40 hover:text-nowrap">
          <div className="text-md">{sharedSongState.name}</div>
          <div className="text-sm opacity-50">United States</div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayerController;
