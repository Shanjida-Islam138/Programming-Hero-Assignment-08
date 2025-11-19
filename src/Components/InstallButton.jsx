import React from "react";

const InstallButton = ({
    installed,
    onInstall,
    disabled,
    label,
    className = "",
}) => {

    const handlePress = () => {
        if (!installed && typeof onInstall === "function") {
            onInstall();
        }
    };

    const finalLabel = installed ? "Installed" : label || "Install";

    const activeButtonStyle = className ? className : "btn-primary";

    return (
        <button
            type="button"
            onClick={handlePress}
            disabled={installed || disabled}
            aria-live="polite"
            className={`btn w-full sm:w-auto ${
                installed
                    ? "btn-disabled bg-slate-100 border-slate-200 text-slate-500"
                    : activeButtonStyle
            }`}
        >
            {finalLabel}
        </button>
    );
};

export default InstallButton;
