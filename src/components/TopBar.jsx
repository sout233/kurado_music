import React from 'react';

import { Window } from '@tauri-apps/api/window';

const appWindow = new Window('main');

const TopBar = () => {
    return (
        <div data-tauri-drag-region className="flex items-center justify-between flex-row w-full">
            <h1 className="flex pl-4 text-xl font-bold justify-start">Kurado Music</h1>
            <div className="flex justify-end space-x-3 pr-4">
                <a onClick={() => appWindow.minimize()} className="titlebar-button" id="titlebar-minimize">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2" /></svg>
                </a>
                <div onClick={() => appWindow.toggleMaximize()} className="titlebar-button" id="titlebar-maximize">
                    <svg className="w-[1.1rem] h-[1.1rem] mt-[1px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M3 5.25A2.25 2.25 0 0 1 5.25 3h9.5A2.25 2.25 0 0 1 17 5.25v9.5A2.25 2.25 0 0 1 14.75 17h-9.5A2.25 2.25 0 0 1 3 14.75zm2.25-.75a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h9.5a.75.75 0 0 0 .75-.75v-9.5a.75.75 0 0 0-.75-.75z" /></svg>
                </div>
                <div onClick={() => appWindow.close()} className="titlebar-button" id="titlebar-close">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" /></svg>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
