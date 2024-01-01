import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Icon = ({ iconStyle, icon, className, ...rest }) => {
    const { size, rotation, spin, border, pull, flip } = rest;

    return (
        <>
            <FontAwesomeIcon
                className={className}
                icon={[iconStyle, icon]}
                size={size}
                rotation={rotation}
                spin={spin}
                border={border}
                pull={pull}
                flip={flip}
            />
        </>
    );
};