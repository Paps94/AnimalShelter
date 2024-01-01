import React, { useEffect, useState } from "react";
import { StylingContext } from "@/Context/StylingContext";
// Import and add FontAwesome libnrary
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(far, fas);

// Import AOS library
import AOS from 'aos';
import "aos/dist/aos.css";

export default function Main({ children }) {
    const [theme, setTheme] = useState();

    // On startup we check the users preferences in regards to dark/light theme and set that
    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
        //Initialize library to use animation
        AOS.init();
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