import React, { useEffect, useMemo } from "react";
import "regenerator-runtime";
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useSortBy,
    usePagination,
    useFlexLayout,
} from "react-table";
import {
    ChevronDoubleLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import { Button, PageButton, CartoonButton } from "./Button";
import { cn, copy } from "@/lib/utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./Icons";
import { Icon } from "../UI/Icon";
import $ from 'jquery';
import { Label } from "./label";

import Select from "react-select";
import makeAnimated from 'react-select/animated';

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
                className="w-full rounded-md bg-blue-50 dark:bg-orange-50 text-gray-900 cursor-text inline-block font-semibold text-md leading-[35px] no-underline select-none touch-manipulation py-0 border-2 border-solid border-gray-700 active:shadow-gray-700 active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5
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
                className="w-full rounded-md bg-blue-50 dark:bg-orange-50 text-gray-900 cursor-text inline-block font-semibold text-md leading-[35px] no-underline select-none touch-manipulation py-0 border-2 border-solid border-gray-700 active:shadow-gray-700 active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5
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
export const SelectColumnFilter = ({ column: { setFilter, preFilteredRows, id, filter } }) => {
    const multi = typeof filter === "string" ? false : true;
    const animatedComponents = makeAnimated(); 
    
    // Declare selectRef here
    let selectRef = null;  

    const clearValue = () => {
        // Use the locally declared selectRef
        selectRef.clearValue();
    };

    // Calculate the options for filtering using the preFilteredRows
    const options = useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <div className="mt-2">
            <Select
                ref={(ref) => {
                    // Assign to the locally declared selectRef
                    selectRef = ref;
                }}
                isMulti={multi}
                components={animatedComponents}
                className="rounded-md text-gray-900 font-semibold text-md"
                name={id}
                classNamePrefix="react-select"
                data-type="filter"
                id={id}
                options={options.map((option) => {
                    return { value: option, label: option };
                })}
                onChange={(e) => {
                    filter === "equals"
                    ? setFilter(e.value || undefined) // Set undefined to remove the filter entirely
                    : setFilter(setFilteredParamsMultiSelect(e));
                }}
            />
            <button hidden data-action="clear" onClick={clearValue}></button>
        </div>
    );
}

// Returns an array of multiple values to be included in the filter
export const multipleFilter = (rows, accessor, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
        if (filterValue.includes(val.original[accessor].toString())) arr.push(val);
    });
    return arr;
};

// Returns all the results which are less than the filtered value
export const filterLessThan = (rows, id, filterValue) => {
    return rows.filter(row => {
        const rowValue = row.values[id];
        return rowValue <= filterValue;
    });
}

// Returns all the results which are greater than the filtered value
export const filterGreaterThan = (rows, id, filterValue) => {
    return rows.filter(row => {
        const rowValue = row.values[id];
        return rowValue >= filterValue;
    });
}

function setFilteredParams(filterArr, val) {
    if (filterArr.includes(val)) {
        filterArr = filterArr.filter((n) => {
            return n !== val;
        });
    } else filterArr.push(val);
    if (filterArr.length === 0) filterArr = undefined;
    console.log(filterArr);
    return filterArr;
}

// Adds and removes values from the array depending if they are already there or not
function setFilteredParamsMultiSelect(val) {
    var filterArr = [];
    val.forEach(selectedOption => {
        filterArr.push(selectedOption.value)
    });
    if (filterArr.length === 0) filterArr = undefined;
    console.log(filterArr);
    return filterArr;
}

// This is a custom filter UI for selecting a unique option from a list
export function CheckBoxColumnFilter({
    column: { filterValue = [], setFilter, preFilteredRows, id }
}) {
    const options = useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);


    return (
        <div className="mt-2 flex flex-col gap-4 justify-start  sm:flex-row ">
            {options.map((option, i) => (
                
                <div className="flex items-center space-x-2" key={i}>
                    <input 
                        type="checkbox"
                        name={option == 1 ? 'Yes' : option == 0 ? 'No' : option}
                        id={option == 1 ? 'Yes' : option == 0 ? 'No' : option}
                        value={option}
                        onChange={(e) => {
                            setFilter(setFilteredParams(filterValue, e.target.value));
                        }}
                    />
                    <Label
                        htmlFor={option == 1 ? 'Yes' : option == 0 ? 'No' : option}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {option == 1 ?  'Yes' : option == 0 ? 'No' : option}
                    </Label>
                </div>
            ))}
        </div>
    );
}

// This is a custom filter UI that uses a slider to set the filter value between a column's min and max values
export function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id }
}) {
    // Calculate the min and max
    // using the preFilteredRows

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;

        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <>
            <input
                type="range"
                min={min}
                max={max}
                value={filterValue || min}
                step="0.25"
                onChange={e => {
                    setFilter(parseInt(e.target.value));
                }}
            />
            <span className="block w-20 ml-2 p-2 rounded-md dark:bg-gray-300 dark:border-gray-900 dark:text-gray-900 border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {filterValue == undefined ? "- Kg" : filterValue + " Kg"}
            </span>
            {/* <button onClick={() => setFilter(undefined)}>Reset</button> */}
        </>
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
                className="w-[120px] px-2 rounded-md dark:bg-gray-300 dark:border-gray-900 dark:text-gray-900 border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                className="w-[120px] px-2 rounded-md dark:bg-gray-300 dark:border-gray-900 dark:text-gray-900 border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

export function IconPiil({ value, className }) {
    return (
        <Icon
            className={cn(
                "font-bold text-4xl text-orange-300",
                className
            )}
            icon={value}
        />
    );
}

export function BooleanPill({ value, className }) {
    var icon = "check";
    var custom = "text-3xl";
    if (value  == null || value == 0) {
        icon = "xmark";
        custom = "text-4xl"
    }
    return (
        <Icon
        icon={icon}
        className={cn(
            "font-normal dark:text-orange-300 text-gray-700",
            className,
            custom
        )}
    />
    );
}

export function SexPill({ value, className }) {
    var icon = "mars";
    var text = "M";
    if (value  == 'female') {
        icon = "venus";
        text = "F";
    }
    return (
        <>
            <Icon
                icon={icon}
                className={cn(
                    "font-bold text-3xl dark:text-orange-300 mr-2",
                    className,
                )}
            />
            <span className="font-bold text-3xl dark:text-orange-300">({text})</span>
        </>
        
        
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
                            className="mt-1 block w-full rounded-md dark:bg-gray-300 dark:border-gray-900 dark:text-gray-700 border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
function ResetFilterButton({ setAllFilters, setGlobalFilter }) {
    const clearGlobalFilter = useAsyncDebounce(() => {
        let globalFilter = document.getElementById('globalFilter');
        globalFilter.value = '';
    }, 200);

    const resetCheckboxes = () => {
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
    };

    const resetMultiSelects = () => {
        // Find all buttons with data-action="clear"
        const clearButtons = document.querySelectorAll('button[data-action="clear"]');

        // Loop through all the found buttons and simulate a click on each
        clearButtons.forEach(button => {
            button.click();
        });
    };

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
                    // Reset all checkboxes
                    resetCheckboxes();
                    // Clears all select values visually
                    resetMultiSelects();
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
                className="h-[42px] inline-flex items-center px-4 py-2 bg-[--color-mid-blue] dark:bg-gray-200 border border-transparent rounded-md font-semibold text-center text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-[--color-dark-blue] dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 dark:focus:ring-[--color-yellow] focus:ring-[--color-mid-blue] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition ease-in-out duration-300 sm:mb-2 sm:ml-4 lg:float-right w-full sm:w-auto"
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

    const defaultColumn = React.useMemo(
        () => ({
          // When using the useFlexLayout:
          minWidth: 50, // minWidth is only used as a limit for resizing
          width: 250, // width is used for both the flex-basis and flex-grow
          maxWidth: 500, // maxWidth is only used as a limit for resizing
        }),
        []
    )

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
            defaultColumn,
            initialState: {
                pageSize: defaultPageSize,
            },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useFlexLayout,
        usePagination
    );

    // Mimics the scollbar behaviour from the bottom of the page to the one at the top
    useEffect(() => {
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
            <pre>
                <code>{JSON.stringify(state.filters, null, 2)}</code>
            </pre>
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="flex lg:flex-row flex-col justify-between gap-4 mb-6">
                    <div className="w-auto font-semibold text-2xl sm:text-3xl text-gray-800 dark:text-gray-200 leading-tight">
                        {title}
                    </div>
                </div>
                <div className="flex flex-col w-full sm:flex-row">
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
                {/* table */}
                    <div className="max-h-[900px] h-auto w-full mt-4 overflow-scroll align-middle flex flex-col shadow border-b border-gray-200 dark:border-gray-700 rounded-lg">
                        <table
                            {...getTableProps()}
                            className="w-full h-full rounded-lg min-w-full divide-y divide-gray-200 "
                        >
                            <thead className="bg-blue-400 dark:bg-slate-700 sticky top-0 z-10">
                                {headerGroups.map((headerGroup) => (
                                    <tr
                                        {...headerGroup.getHeaderGroupProps()}
                                    >
                                        {headerGroup.headers.map(
                                            (column) => (
                                                // Add the sorting props to control sorting.
                                                <th
                                                    scope="col"
                                                    className="w-auto group px-6 py-3 text-left text-sm font-black text-slate-900  dark:border-gray-700 dark:text-white uppercase tracking-wider"
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
                                                                    <SortDownIcon className="w-4 h-4 text-slate-900 dark:text-white" />
                                                                ) : (
                                                                    <SortUpIcon className="w-4 h-4 text-slate-900 dark:text-white" />
                                                                )
                                                            ) : (
                                                                <SortIcon className="w-4 h-4 text-slate-900 dark:text-white opacity-0 group-hover:opacity-100" />
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
                                className="bg-blue-100 dark:bg-gray-900 divide-y divide-white dark:divide-gray-700"
                            >
                                {page.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps([
                                                {
                                                    className:
                                                        "dark:hover:bg-gray-700 hover:bg-blue-200 divide-x divide-dashed text-slate-900 dark:text-white",
                                                },
                                            ])}
                                            data-document-id = {row.original.document_id}
                                        >
                                            {row.cells.map((cell) => {
                                                return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="px-6 py-4 whitespace-nowrap dark:hover:bg-gray-600 hover:bg-blue-400"
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