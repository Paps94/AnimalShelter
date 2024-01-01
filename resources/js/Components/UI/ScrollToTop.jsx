import React, { useEffect, useState } from "react";
import { Icon } from "./Icon";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(true);

    // Top: 0 takes us all the way back to the top of the page
    // Behavior: smooth keeps it smooth!
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        // Button is displayed after scrolling for 50 pixels
        const toggleVisibility = () => {
            if (window.pageYOffset > 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

return (
    <>
        {isVisible && (
        <div
            onClick={scrollToTop}
            className="cursor-pointer h-11 fixed w-11 z-[99] right-[15px] bottom-5 rounded-lg bg-blue-400 dark:bg-orange-300 hover:cursor-pointer text-center"
            data-aos="fade-left"
            data-aos-duration="500"
            data-tooltip-id="generalTooltip" data-tooltip-content="Scroll to top" data-tooltip-place="left"
        >
            <Icon icon="up-long" className="relative top-[calc(50%_-_15px)] w-7 h-7 fill-current text-gray-200 "></Icon>
        </div>
        )}
    </>
);
}