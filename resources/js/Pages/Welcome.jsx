import { Link, Head } from '@inertiajs/react';
import { Tooltip } from 'react-tooltip';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white tooltipParent transition-all duration-[0.5s] ease-[ease]">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="mx-1 bg-blue-50 dark:bg-orange-50 shadow-blue-400 shadow-[4px_4px_0_0] dark:shadow-orange-300 dark:shadow-[4px_4px_0_0] text-gray-700 cursor-pointer inline-block font-semibold text-md leading-[35px] text-center no-underline select-none touch-manipulation px-[18px] py-0 rounded-[30px] border-2 border-solid border-gray-700 hover:bg-blue-100  dark:hover:bg-orange-100 active:shadow-gray-700 active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="mx-1 bg-blue-50 dark:bg-orange-50 shadow-blue-400 shadow-[4px_4px_0_0] dark:shadow-orange-300 dark:shadow-[4px_4px_0_0] text-gray-700 cursor-pointer inline-block font-semibold text-md leading-[35px] text-center no-underline select-none touch-manipulation px-[18px] py-0 rounded-[30px] border-2 border-solid border-gray-700 hover:bg-blue-100  dark:hover:bg-orange-100 active:shadow-gray-700 active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 mx-1 bg-blue-50 dark:bg-orange-50 shadow-blue-400 shadow-[4px_4px_0_0] dark:shadow-orange-300 dark:shadow-[4px_4px_0_0] text-gray-700 cursor-pointer inline-block font-semibold text-md leading-[35px] text-center no-underline select-none touch-manipulation px-[18px] py-0 rounded-[30px] border-2 border-solid border-gray-700 hover:bg-blue-100 dark:hover:bg-orange-100 active:shadow-gray-700active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="min-h-screen h-full w-full p-8 bg-orange-200 dark:bg-slate-900">
                    Main content here
                </div>
                <Tooltip id="generalTooltip" className="tooltip"/>
            </div>
        </>
    );
}
