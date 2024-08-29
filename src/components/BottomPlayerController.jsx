import React from "react";
import { useSelector } from "react-redux";

const BottomPlayerController = () => {
  const sharedSongState = useSelector(state => state.sharedState);

  return (
    <div className="flex flex-col h-full">
      <input type="range" min={0} max="100"  className="range range-ss rounded-none flex-col absolute -translate-y-1" />
      {/* <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */}
      <div className="flex flex-row items-center justify-between h-full">
        {/* 左侧 */}
        <div className="flex items-center gap-3 xl:m-4 md:pl-2 m-2 justify-start w-1/3">
          {/* 封面 */}
          <div className="avatar">
            <div className="mask mask-squircle h-16 w-16">
              <img src={sharedSongState && sharedSongState.album.picUrl} />
            </div>
          </div>
          {/* 歌曲信息 */}
          <div className="truncate text-ellipsis max-w-40 hover:text-nowrap hover:max-w-full hover:absolute hover:left-24">
            <div className="text-md">{sharedSongState && sharedSongState.name}</div>
            <div className="text-sm opacity-50 hover:bg-base-100 rounded-badge">
              {sharedSongState && (
                <div className="truncate line-clamp-2">
                  {sharedSongState.artists.map((artist) => artist.name).join(' / ')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 中间 */}
        <div className="flex items-center gap-3 justify-center w-1/3">
          {/* 上一首 */}
          <button className="btn btn-circle bg-base-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="currentColor" d="m11.828 12l2.829 2.829l-1.414 1.414L9 12.001l4.243-4.243l1.414 1.414z" /></svg>
          </button>
          {/* 播放按钮 */}
          <button className="btn btn-circle bg-base-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><path fill="currentColor" d="M6 20.196V3.804a1 1 0 0 1 1.53-.848l13.113 8.196a1 1 0 0 1 0 1.696L7.53 21.044A1 1 0 0 1 6 20.196" /></svg>
          </button>
          {/* 下一首 */}
          <button className="btn btn-circle bg-base-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12.172 12L9.343 9.173l1.415-1.414L15 12l-4.242 4.242l-1.415-1.414z" /></svg>
          </button>
        </div>

        {/* 右侧 */}
        <div className="flex items-center gap-3 m-2 justify-end w-1/3">
          <div className="flex items-center">
            <button className="btn btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="m4 3.5l5 5l-5 5zM21 20v-2H3v2zm0-7v-2h-9v2zm0-7V4h-9v2z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayerController;
