import React, { useState } from "react";
import { Link, Head } from '@inertiajs/react';
import { Tooltip } from 'react-tooltip';
import Table, { 
    DefaultColumnFilter, 
    SelectColumnFilter, 
    IconPiil, 
    BooleanPill, 
    SexPill, 
    CheckBoxColumnFilter, 
    multipleFilter, 
    NumberRangeColumnFilter, 
    SliderColumnFilter,
    filterGreaterThan

} from '@/Components/Table/Table';
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
                ),
                width: 100
            },
            {
                Header: "Name",
                accessor: "name",
                Filter: DefaultColumnFilter,
                width: 300,
            },
            {
                Header: "Category",
                accessor: "type",
                Filter: SelectColumnFilter,
                filter: multipleFilter,
                Cell: IconPiil,
                width: 175,
            },
            {
                Header: "Breed",
                accessor: "breed",
                Filter: SelectColumnFilter,
                filter: multipleFilter,
                width: 300,
            },
            {
                Header: "Neutered/Spayed",
                accessor: "castrated",
                Filter: CheckBoxColumnFilter,
                filter: multipleFilter,
                Cell: BooleanPill,
                width: 175
            },
            {
                Header: "Reserved",
                accessor: "reserved",
                Filter: CheckBoxColumnFilter,
                filter: multipleFilter,
                Cell: BooleanPill,
                width: 175
            },
            {
                Header: "Microchipped",
                accessor: "microchipped",
                Filter: CheckBoxColumnFilter,
                filter: multipleFilter,
                Cell: BooleanPill,
                width: 175
            },
            {
                Header: "Age",
                accessor: "birthday",
                Cell: ageCalculator,
                width: 200
            },
            {
                Header: "Weight",
                accessor: "weight",
                Filter: SliderColumnFilter,
                filter: filterGreaterThan,
                width: 150
            },
            {
                Header: "Sex",
                accessor: "sex",
                Filter: SelectColumnFilter,
                filter: "equals",
                Cell: SexPill,
                width: 175
            },
            {
                Header: "# Days in shelter",
                accessor: "arrived_at_shelter",
                Cell: daysCalculator,
                width: 125
            },
            {
                Header: "Can live with children",
                accessor: "live_with_cats",
                Filter: CheckBoxColumnFilter,
                filter: multipleFilter,
                Cell: BooleanPill,
                width: 150
            },
            {
                Header: "Can live with dogs",
                accessor: "live_with_dogs",
                Filter: CheckBoxColumnFilter,
                filter: multipleFilter,
                Cell: BooleanPill,
                width: 150
            },
            {
                Header: "Can live with cats",
                accessor: "live_with_kids",
                Filter: CheckBoxColumnFilter,
                filter: multipleFilter,
                Cell: BooleanPill,
                width: 150
            },
        ],
        []
    );

    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center dark:bg-dots-lighter dark:selection:bg-orange-300 selection:bg-blue-400 selection:text-white tooltipParent transition ease-in-out duration-300 bg-orange-100 dark:bg-slate-900">
                <div className="w-full p-6 h-screen">
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
