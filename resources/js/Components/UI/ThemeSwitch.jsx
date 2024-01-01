import React, { useContext } from "react";
import { StylingContext } from "@/Context/StylingContext";
import { Icon } from "./Icon";

export default function ThemeSwitch() {
    const { theme, setTheme } = useContext(StylingContext);

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            className="fixed -left-2 top-1/2 z-40 dark:bg-orange-300 bg-blue-400 p-3 rounded-full cursor-pointer 
                        before:fixed before:top-1/2 before:h-[52px] before:left-0 before:w-6 before:dark:bg-orange-300 before:bg-blue-400 before:rounded-l-none before:rounded-lg
                        md:before:h-[60px] xl:before:w-10 xl:left-1"
            onClick={handleThemeSwitch}
            data-tooltip-id="generalTooltip" data-tooltip-content="Change Theme" data-tooltip-place="right"
        >
            {theme === "dark" ? (
                <Icon
                    icon="sun"
                    className="relative block md:h-9 md:w-9 w-7 h-7 fill-current text-gray-200 hover:cursor-pointer"
                />
            ) : (
                <Icon
                    icon="moon"
                    className="relative block md:h-9 md:w-9 w-7 h-7 fill-current text-gray-200 hover:cursor-pointer"
                />
            )}
        </button>
    );
}