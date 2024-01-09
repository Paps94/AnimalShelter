import React, { useState } from "react";
import { Link, Head } from '@inertiajs/react';
import { Tooltip } from 'react-tooltip';
import Table, { DefaultColumnFilter, SelectColumnFilter, IconPiil } from '@/Components/Table/Table';
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/UI/Avatar"
import { calculateAge, calculateDays } from "@/lib/utils";

export default function Welcome({ auth, animals }) {

    const ageCalculator = ({ cell }) => {
        return calculateAge(cell.row.values.birthday);
    }

    const daysCalculator = ({ cell }) => {
        return calculateDays(cell.row.values.arrived_at_shelter);
    }

    const columns = React.useMemo(
        () => [
            {
                Header: "Avatar", 
                Cell: ({row}) => (
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                )
            },
            {
                Header: "Name",
                accessor: "name",
                Filter: DefaultColumnFilter,
            },
            {
                Header: "Category",
                accessor: "type",
                Filter: SelectColumnFilter,
                filter: "includes",
                Cell: IconPiil,
            },
            {
                Header: "Breed",
                accessor: "breed",
                Filter: DefaultColumnFilter,
            },
            {
                Header: "Neutered/Spayed",
                accessor: "castrated",
                Filter: DefaultColumnFilter,
            },
            {
                Header: "Reserved",
                accessor: "reserved",
                Filter: DefaultColumnFilter,
            },
            {
                Header: "Microchipped",
                accessor: "microchipped",
                Filter: DefaultColumnFilter,
            },
            {
                Header: "Age",
                accessor: "birthday",
                Filter: DefaultColumnFilter,
                Cell: ageCalculator
            },
            {
                Header: "Weight (KGs)",
                accessor: "weight",
                Filter: DefaultColumnFilter,
            },
            {
                Header: "Sex",
                accessor: "sex",
                Filter: DefaultColumnFilter,
            },
            {
                Header: "# Day in shelter",
                accessor: "arrived_at_shelter",
                Filter: DefaultColumnFilter,
                Cell: daysCalculator
            },
            {
                Header: "Can live with children",
                accessor: "live_with_cats",
                Filter: DefaultColumnFilter,
            },
            {
                Header: "Can live with dogs",
                accessor: "live_with_dogs",
                Filter: DefaultColumnFilter,
            },
            {
                Header: "Can live with cats",
                accessor: "live_with_kids",
                Filter: DefaultColumnFilter,
            },
        ],
        []
    );

    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center dark:bg-dots-lighter dark:selection:bg-orange-300 selection:bg-blue-400 selection:text-white tooltipParent transition ease-in-out duration-300 bg-orange-100 dark:bg-slate-900">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
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
                </div>

                <div className="min-h-screen h-full w-full p-8 mt-20">
                    <Table
                        columns={columns}
                        data={animals}
                        title="Animal List"
                    />
                </div>
                <Tooltip id="generalTooltip" className="tooltip"/>
            </div>
        </>
    );
}
