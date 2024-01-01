import React, { useEffect, useState } from "react";
import { StylingContext } from "@/Context/StylingContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(far, fas);

export default function Main({ children }) {
    const [theme, setTheme] = useState();

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <>
            <StylingContext.Provider value={{theme, setTheme}}>
                {children}
            </StylingContext.Provider>
        </>
    );
}