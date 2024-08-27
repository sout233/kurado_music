import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import SideMenu from "./components/SideMenu";
import TopBar from "./components/TopBar";
import SearchPage from "./pages/SearchPage";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

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
        <p>{greetMsg}</p>
      </div>
    </div>
  );
}

export default App;
