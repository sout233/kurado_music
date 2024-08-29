import { useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useSelector, useDispatch } from 'react-redux';

const SearchPage = () => {
    const [data, setData] = useState();
    const searchInputRef = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();

        let invokeResult = await invoke("search", { query: searchInputRef.current.value });

        setData(JSON.parse(invokeResult).result.songs);

        console.log(data);

        let fixedResult = await invoke("fix_cover_url", { searchResponse: invokeResult });

        console.log(fixedResult);

        setData(JSON.parse(fixedResult).result.songs);

        console.log(data);
    }

    const sharedState = useSelector(state => state.sharedState);
    const dispatch = useDispatch();
  
    const updateState = (value) => {
      dispatch({ type: 'UPDATE_STATE', payload: value });
    };
  

    return (
        <div className="flex flex-col space-y-2 max-h-full overflow-hidden">
            <div className="flex flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold justify-start">Search Page</h1>
                <form onSubmit={handleSubmit}>
                    <label className="input bg-base-200 rounded-3xl h-10 m-2 flex items-center justify-end">
                        <input ref={searchInputRef} type="text" className="grow" placeholder="Search" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </form>
            </div>
            <div className="overflow-x-auto overflow-y-scroll max-h-full">
                <table className="table overflow-x-auto overflow-y-scroll max-h-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>歌曲</th>
                            <th>作者</th>
                            <th>ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((song, index) => (
                            <tr key={index}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={song.album.picUrl} />
                                            </div>
                                        </div>
                                        <div className="truncate text-ellipsis max-w-40 hover:text-nowrap">
                                            {song.name && <div className="font-bold">{song.name}</div>}
                                            {/* <div className="text-sm opacity-50">United States</div> */}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex space-x-1 max-w-48 hover:max-w-auto overflow-hidden hover:overflow-auto truncate">
                                        {song.artists && song.artists.map((artist, index) => (
                                            <div key={index} className="badge badge-ghost badge-sm">
                                                {artist.name}{index < song.artists.length - 1}
                                            </div>
                                        ))}
                                    </div>

                                    {/* <br /> */}
                                    {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                </td>
                                <td>{song.id}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => updateState(song)}>PLAY</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchPage;
