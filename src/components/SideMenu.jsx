import React from 'react';

const SideMenu = () => {
    return (
        <div>
            <ul className="menu bg-base-200 h-full rounded-r-xl space-y-6 flex flex-col">
                <li className="flex justify-start">
                    <a>
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79zm-2-1V9.978l-7-5.444l-7 5.444V19z" /></svg>
                    </a>
                </li>
                <li className="flex justify-start">
                    <a>
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617m-2.006-.742A6.98 6.98 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.98 6.98 0 0 0 4.875-1.975z"/></svg>
                    </a>
                </li>
                <li className="flex justify-end">
                    <a>
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 1l9.5 5.5v11L12 23l-9.5-5.5v-11zm0 2.311L4.5 7.653v8.694l7.5 4.342l7.5-4.342V7.653zM12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8m0-2a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/></svg>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;
