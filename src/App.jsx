import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import SideMenu from "./components/SideMenu";
import TopBar from "./components/TopBar";
import SearchPage from "./pages/SearchPage";
import BottomPlayerController from "./components/BottomPlayerController";

function App() {
  return (
    <div className="h-screen flex flex-col justify-between rounded-2xl overscroll-none">
      <div className="h-16 bg-base-200 w-full flex">
        <TopBar/>
      </div>
      <div className="h-[80vh] bg-base-100 w-full flex py-4">
        <SideMenu />
        <div className="my-2 mx-4 w-full h-full overflow-y-auto max-h-full">
        <SearchPage/>
        </div>
      </div>
      <div className="h-28 bg-base-200">
        <BottomPlayerController/>
      </div>
    </div>
  );
}

export default App;
