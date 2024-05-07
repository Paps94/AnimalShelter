import React, { useState } from "react";
import { Link, Head } from '@inertiajs/react';
import { Tooltip } from 'react-tooltip';

export default function Welcome() {

    const left = document.getElementById("left-side");
    const handleMove = e => {
        left.style.width = `${e.clientX / window.innerWidth * 100}%`;
    }

    document.onmousemove = e => handleMove(e);
    document.ontouchmove = e => handleMove(e.touches[0]);

    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center dark:bg-dots-lighter dark:selection:bg-orange-300 selection:bg-blue-400 selection:text-white tooltipParent transition ease-in-out duration-300 bg-orange-100 dark:bg-slate-900">
                {/* <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="mx-1 bg-blue-50 dark:bg-orange-50 shadow-blue-400 shadow-[4px_4px_0_0] dark:shadow-orange-300 dark:shadow-[4px_4px_0_0] text-gray-700 cursor-pointer inline-block font-semibold text-md leading-[35px] text-center no-underline select-none touch-manipulation px-[18px] py-0 rounded-[30px] border-2 border-solid border-gray-700 hover:scale-110 active:shadow-gray-700 active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5 transition ease-in-out duration-300"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="mx-1 bg-blue-50 dark:bg-orange-50 shadow-blue-400 shadow-[4px_4px_0_0] dark:shadow-orange-300 dark:shadow-[4px_4px_0_0] text-gray-700 cursor-pointer inline-block font-semibold text-md leading-[35px] text-center no-underline select-none touch-manipulation px-[18px] py-0 rounded-[30px] border-2 border-solid border-gray-700 hover:scale-110 active:shadow-gray-700 active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5 transition ease-in-out duration-300"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 mx-1 bg-blue-50 dark:bg-orange-50 shadow-blue-400 shadow-[4px_4px_0_0] dark:shadow-orange-300 dark:shadow-[4px_4px_0_0] text-gray-700 cursor-pointer inline-block font-semibold text-md leading-[35px] text-center no-underline select-none touch-manipulation px-[18px] py-0 rounded-[30px] border-2 border-solid border-gray-700 hover:scale-110 active:shadow-gray-700active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5 transition ease-in-out duration-300"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div> */}

                <div id="left-side" className="grid h-screen overflow-hidden place-items-center absolute w-full left-0 bg-[--color-light-blue] dark:bg-slate-900">
                    <h2 className="text-[7vw] font-extrabold w-[80vw] mx-[10vw] my-0 text-white font-basic"> Sometimes a simple header is <span className="text-[1.8em] leading-[0.6em] text-[--color-light-orange] font-fancy">better</span></h2>
                </div>
                <div id="right-side" className="grid h-screen overflow-hidden place-items-center absolute w-full bg-[--color-light-orange] dark:bg-slate-800">
                    <h2 className="text-[7vw] font-extrabold w-[80vw] mx-[10vw] my-0 text-white font-basic">Sometimes a simple header is <span class="text-[1.8em] leading-[0.6em] text-[--color-light-blue] font-fancy">worse</span></h2>
                </div>

                <Tooltip id="generalTooltip" className="tooltip"/>
            </div>
        </>
    );
}
