export default function Button({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `mx-1 bg-blue-50 dark:bg-orange-50 shadow-blue-400 shadow-[4px_4px_0_0] dark:shadow-orange-300 dark:shadow-[4px_4px_0_0] text-gray-700 cursor-pointer inline-block font-semibold text-md leading-[35px] text-center no-underline select-none touch-manipulation px-[18px] py-0 rounded-[30px] border-2 border-solid border-gray-700 hover:bg-blue-100  dark:hover:bg-orange-100 active:shadow-gray-700 active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
