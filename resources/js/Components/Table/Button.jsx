import { cn } from "@/lib/utils";

export function Button({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={
        cn(
          "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
          className
        )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function PageButton({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={
        cn(
          "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
          className
        )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function ControlButton({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={
        cn(
          "relative inline-flex items-center align-middle p-2 rounded-full mx-2 w-8 h-8 text-white ",
          className
        )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function CartoonButton({ children, disabled, className, ...rest }) {
  return (
      <button
          type="button"
          className={
              `mx-1 bg-blue-50 dark:bg-orange-50 shadow-blue-400 shadow-[4px_4px_0_0] dark:shadow-orange-300 dark:shadow-[4px_4px_0_0] text-gray-700 cursor-pointer inline-block font-semibold text-md leading-[35px] text-center no-underline select-none touch-manipulation px-[18px] py-0 rounded-[30px] border-2 border-solid border-gray-700 hover:scale-110 active:shadow-gray-700 active:shadow-[2px_2px_0_0] active:translate-x-0.5 active:translate-y-0.5 transition ease-in-out duration-300 ${
                  disabled && 'opacity-25'
              } ` + className
          }
          disabled={disabled}
          {...rest}
      >
          {children}
      </button>
  );
}

