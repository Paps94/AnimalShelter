import React, { useEffect } from "react";
import "regenerator-runtime";
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useSortBy,
    usePagination,
} from "react-table";
import {
    ChevronDoubleLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import { Button, PageButton, CartoonButton } from "./Button";
import { cn, copy, uppercase } from "@/lib/utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./Icons";
import { Icon } from "../UI/Icon";
import $ from 'jquery';

// Define a default UI for filtering
function GlobalFilter({ 
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className="flex gap-x-2 items-baseline flex-col">
            <label className="font-black text-lg text-gray-700 dark:text-white mb-1">Global Search: </label>
            <input
                type="text"
                id="globalFilter"
                className="w-full rounded-md bg-blue-50 dark:bg-orange-50 text-gray-900 cursor-text inline-block font-semibold text-md leading-[35px] no-underline select-none touch-manipulation py-0 border-2 border-solid border-gray-300 active:shadow-gray-700 active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5
                focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                dark:focus:border-orange-300 dark:focus:ring dark:focus:ring-orange-200 dark:focus:ring-opacity-50"
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </div>
    );
}

// Define a default UI for filtering
export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter, render },
}) {
    const count = preFilteredRows.length;
    return (
        <div className="mt-2">
            <input
                type="text"
                data-type="filter"
                name={render("id")}
                className="w-full rounded-md bg-blue-50 dark:bg-orange-50 text-gray-900 cursor-text inline-block font-semibold text-md leading-[35px] no-underline select-none touch-manipulation py-0 border-2 border-solid border-gray-300 active:shadow-gray-700 active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5
                focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                dark:focus:border-orange-300 dark:focus:ring dark:focus:ring-orange-200 dark:focus:ring-opacity-50"                value={filterValue || ""}
                onChange={(e) => {
                    setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                }}
                placeholder={`Search ${count} records...`}
            />
        </div>
    );
}

// This is a custom filter UI for selecting a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <div className="mt-2">
            <select
                className="w-full rounded-md dark:bg-gray-300 dark:border-gray-900 text-gray-900 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name={id}
                data-type="filter"
                id={id}
                value={filterValue || ""}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {removeUnderscore(uppercase(option))}
                    </option>
                ))}
            </select>
        </div>
    );
}

export function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach((row) => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div className="mt-2 w-auto min-w-[245px]">
            <input
                className="w-[100px] px-2 rounded-md dark:bg-gray-300 dark:border-gray-900 dark:text-gray-900 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={filterValue[0] || ""}
                type="number"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [
                        val ? parseInt(val, 10) : undefined,
                        old[1],
                    ]);
                }}
                placeholder={`Min (${min})`}
            />
            <span className="mx-1">to</span>
            <input
                className="w-[100px] px-2 rounded-md dark:bg-gray-300 dark:border-gray-900 dark:text-gray-900 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={filterValue[1] || ""}
                type="number"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [
                        old[0],
                        val ? parseInt(val, 10) : undefined,
                    ]);
                }}
                placeholder={`Max (${max})`}
            />
        </div>
    );
}

export function RolePill({ value }) {
    const role = value ? value.toLowerCase().replace(/_/g, " ") : "unknown";

    return (
        <span
            className={cn(
                "px-3 py-2 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
                role.startsWith("admin") ? "bg-sky-300 text-sky-800" : null,
                role.startsWith("harbour master")
                    ? "bg-purple-300 text-purple-800"
                    : null,
                role.startsWith("operator")
                    ? "bg-amber-300 text-amber-800"
                    : null
            )}
        >
            {role}
        </span>
    );
}

export function DefaultPill({ value }) {
    return (
        <span
            className={cn(
                "px-10 py-2 uppercase leading-wide font-bold text-sm rounded-full shadow-sm bg-blue-300 text-gray-900 dark:bg-gray-300 dark:text-gray-800"
            )}
        >
            {value}
        </span>
    );
}

export function NullPill({ value }) {
    if (value  == null || value == 0) {
        value =  <Icon
            icon="xmark"
            className="text-xs rounded-full w-6 h-6 p-1 bg-red-700 text-white"
        />
    } else {
        value =  <Icon
            icon="check"
            className="text-xs rounded-full w-6 h-6 p-1 bg-green-700 text-white"
        />
    }
    return (
        <span>
            {value}
        </span>
    );
}

function Pagination({
    canPreviousPage, 
    canNextPage, 
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    defaultPageSize,
    totalNoOfRecords
}) {
    return (
        <div className="mt-4 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
                <Button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    Previous
                </Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="flex gap-x-2 items-baseline">
                    <span className="text-sm text-gray-700 dark:text-white">
                        Page{" "}
                        <span className="font-medium">
                            {state.pageIndex + 1}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                            {pageOptions.length}
                        </span>
                    </span>
                    <label>
                        <span className="sr-only">Items Per Page</span>
                        <select
                            className="mt-1 block w-full rounded-md dark:bg-gray-300 dark:border-gray-900 dark:text-gray-700 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={state.pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[15, defaultPageSize, totalNoOfRecords].map((pageSize, key) => (
                                    <option key={key} value={pageSize}>
                                        Show {pageSize == totalNoOfRecords ? "All" : pageSize}
                                    </option>
                                ))}
                        </select>
                    </label>
                </div>
                <div>
                    <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                    >
                        <PageButton
                            className="rounded-l-md"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            <span className="sr-only">First</span>
                            <ChevronDoubleLeftIcon
                                className="h-5 w-5 text-gray-400 dark:border-gray-900 dark:text-gray-700"
                                aria-hidden="true"
                            />
                        </PageButton>
                        <PageButton
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5 text-gray-400 dark:border-gray-900 dark:text-gray-700"
                                aria-hidden="true"
                            />
                        </PageButton>
                        <PageButton
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                className="h-5 w-5 text-gray-400 dark:border-gray-900 dark:text-gray-700"
                                aria-hidden="true"
                            />
                        </PageButton>
                        <PageButton
                            className="rounded-r-md"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            <span className="sr-only">Last</span>
                            <ChevronDoubleRightIcon
                                className="h-5 w-5 text-gray-400 dark:border-gray-900 dark:text-gray-700"
                                aria-hidden="true"
                            />
                        </PageButton>
                    </nav>
                </div>
            </div>
        </div>
    );
}

// Define a default UI for filtering
function ResetFilterButton({setAllFilters, setGlobalFilter}) {
    const clearGlobalFilter = useAsyncDebounce(() => {
        let globalFilter = document.getElementById('globalFilter');
        globalFilter.value = '';
    }, 200);

    return (
        <div className="flex gap-x-2 items-baseline flex-col">
            <label className="font-black text-lg text-gray-700 dark:text-white mb-1">Clear All Filters: </label>
            <CartoonButton
                role="button"
                className="rounded-md"
                onClick={() => {
                    // Custom js to clear the value from the global filter input
                    clearGlobalFilter();
                    // Clears all row filters
                    setAllFilters([]);
                    // Clears the global filter but does not empty the value from the input
                    setGlobalFilter(undefined);
                }}
            >
                Clear Filters<Icon icon="xmark" className="ml-2"/>
            </CartoonButton>
        </div>
    );
}

// Define a default UI for filtering
function GenerateDynamicUrl() {
    const createUrl = () => {
        // Get all inputs and select boxes with the filter keyword
        var filters = document.querySelectorAll('[data-type="filter"]');
        var url = window.location.origin + "?";
        var urlQuery = "";
        [].forEach.call(filters, function(filter) {
            // If there is a value in them add it to our urlQuery variable
            if (filter.value) {
                // Encode the value in case of white spaces " "
                var temp = filter.getAttribute("name") + "=" + encodeURIComponent(filter.value) + "&"; 
                urlQuery = urlQuery.concat(temp);
            }
        });
        // Copy to clipboard our url with the query
        navigator.clipboard.writeText(url.concat(urlQuery));
    };

    return (
        <div className="flex gap-x-2 items-baseline flex-col">
            <label className="font-black text-lg text-gray-700 dark:text-white mb-1">Generate URL: </label>
            <button
                role="button"
                className="h-[42px] inline-flex items-center px-4 py-2 bg-[--color-mid-blue] dark:bg-gray-200 border border-transparent rounded-md font-semibold text-center text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-[--color-dark-blue] dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 dark:focus:ring-[--color-yellow] focus:ring-[--color-mid-blue] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition ease-in-out duration-300 undefined sm:mb-2 sm:ml-4 lg:float-right w-full sm:w-auto"
                onClick={createUrl}
            >
                Copy to clipboard<Icon icon="copy" className="ml-2"/>
            </button>
        </div>
    );
}

function Table({
    columns,
    data,
    title,
    defaultPageSize = 50,
    showButtons = false,
    request = null
}) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,

        page, // Instead of using 'rows', we'll use page, which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setAllFilters,
        getFilterValue,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        setFilter
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: defaultPageSize,
            },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    // Mimics the scollbar behaviour from the bottom of the page to the one at the top
    useEffect(() => {
        $(function(){
            $("#wmd-view-topscroll").scroll(function(){
                $("#wmd-view")
                    .scrollLeft($("#wmd-view-topscroll").scrollLeft());
            });
            $("#wmd-view").scroll(function(){
                $("#wmd-view-topscroll")
                    .scrollLeft($("#wmd-view").scrollLeft());
            });
        });

        // If there is a request in the url set it in our filters
        if (request) {
            for (const key in request) {
                setFilter(key, request[key]);
            }
        }
    }, []);

    // Render the UI for your table
    return (
        <div className="bg-blue-50 opacity-90 dark:bg-slate-800 shadow-sm sm:rounded-lg min-w-[250px] grow">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="flex lg:flex-row flex-col justify-between gap-4 mb-6">
                    <div className="w-auto font-semibold text-2xl sm:text-3xl text-gray-800 dark:text-gray-200 leading-tight">
                        {title}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <div className="md:flex md:gap-x-2">
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </div>
                    <div className="md:flex md:gap-x-2 sm:ml-4 sm:mt-0 mt-2">
                        <ResetFilterButton 
                            setAllFilters={setAllFilters} 
                            setGlobalFilter={setGlobalFilter}
                            globalFilter={state.globalFilter}
                        />
                    </div>
                    {showButtons &&
                        <div className="md:flex md:gap-x-2 sm:ml-4 sm:mt-0 mt-2">
                            <GenerateDynamicUrl 
                                getFilterValue={getFilterValue} 
                            />
                        </div>
                    }   
                </div>
                <Pagination 
                    canPreviousPage={canPreviousPage} 
                    canNextPage={canNextPage}
                    pageOptions={pageOptions}
                    pageCount={pageCount}
                    gotoPage={gotoPage}
                    nextPage={nextPage}
                    previousPage={previousPage}
                    setPageSize={setPageSize}
                    state={state}
                    defaultPageSize={defaultPageSize}
                    totalNoOfRecords={data.length}
                />
                {/* table */}
                {/* Mimic the scrollbar behaviour */}
                <div id="wmd-view-topscroll" className="mt-4 -mb-4 overflow-x-scroll overflow-y-hidden h-5">
                    <div className="w-[4000px]"></div>
                </div>
                <div id="wmd-view" className="overflow-x-scroll overflow-y-hidden ">
                    <div className="overflow-auto mt-4 flex flex-col w-[4000px]">
                        <div className="py-2 align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
                                <table
                                    {...getTableProps()}
                                    className="min-w-full divide-y divide-gray-200 "
                                >
                                    <thead className="bg-blue-100 dark:bg-slate-700">
                                        {headerGroups.map((headerGroup) => (
                                            <tr
                                                {...headerGroup.getHeaderGroupProps()}
                                            >
                                                {headerGroup.headers.map(
                                                    (column) => (
                                                        // Add the sorting props to control sorting.
                                                        <th
                                                            scope="col"
                                                            className="w-auto group px-6 py-3 text-left text-sm font-black text-gray-700  dark:border-gray-300 dark:text-white uppercase tracking-wider"
                                                            {...column.getHeaderProps()}
                                                        >
                                                            <div className="flex items-center justify-between"
                                                            {...column.getHeaderProps(
                                                                column.getSortByToggleProps()
                                                            )}
                                                            > 

                                                                {column.render(
                                                                    "Header"
                                                                )}
                                                                {/* Add a sort direction indicator */}
                                                                <span>
                                                                    {column.isSorted ? (
                                                                        column.isSortedDesc ? (
                                                                            <SortDownIcon className="w-4 h-4 text-gray-400" />
                                                                        ) : (
                                                                            <SortUpIcon className="w-4 h-4 text-gray-400" />
                                                                        )
                                                                    ) : (
                                                                        <SortIcon className="w-4 h-4 text-gray-400 dark:text-white opacity-0 group-hover:opacity-100" />
                                                                    )}
                                                                </span>
                                                            </div>
                                                            {column.Filter ? column.render("Filter") : null}
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody
                                        {...getTableBodyProps()}
                                        className="bg-gray-300 dark:bg-gray-900 divide-y divide-white dark:divide-gray-700"
                                    >
                                        {page.map((row, i) => {
                                            prepareRow(row);
                                            return (
                                                <tr
                                                    {...row.getRowProps([
                                                        {
                                                            className:
                                                                "dark:hover:bg-gray-700 hover:bg-gray-400 divide-x divide-dashed",
                                                        },
                                                    ])}
                                                    data-document-id = {row.original.document_id}
                                                >
                                                    {row.cells.map((cell) => {
                                                        return (
                                                            <td
                                                                {...cell.getCellProps()}
                                                                className="px-6 py-4 whitespace-nowrap dark:hover:bg-gray-600 hover:bg-[--color-light-blue]"
                                                                role="cell"
                                                                onClick={() => {
                                                                    copy(cell.value)
                                                                }}
                                                            >
                                                                {cell.column.Cell
                                                                    .name ===
                                                                "defaultRenderer" ? (
                                                                    <div className="text-sm text-gray-500">
                                                                        {cell.render(
                                                                            "Cell"
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    cell.render(
                                                                        "Cell"
                                                                    )
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination 
                    canPreviousPage={canPreviousPage} 
                    canNextPage={canNextPage}
                    pageOptions={pageOptions}
                    pageCount={pageCount}
                    gotoPage={gotoPage}
                    nextPage={nextPage}
                    previousPage={previousPage}
                    setPageSize={setPageSize}
                    state={state}
                    defaultPageSize={defaultPageSize}
                    totalNoOfRecords={data.length}
                />
            </div>
        </div>
    );
}

export default Table;