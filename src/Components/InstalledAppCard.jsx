import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaDownload, FaHdd, FaStar } from "react-icons/fa";


const compactDownloads = (num) =>
    new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(num);


const prettifySize = (val) => {
    if (typeof val !== "number" || isNaN(val)) return null;

    return val >= 1024
        ? `${(val / 1024).toFixed(1)} GB`
        : `${val} MB`;
};

const InstalledAppCard = ({ app, onUninstall }) => {
    if (!app) return null;

    const readableSize = prettifySize(app.size);

    return (
        <div className="group flex justify-between items-center gap-6 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
            
            
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                
               
                <div className="relative h-40 w-full sm:w-48 overflow-hidden rounded-2xl">
                    <img
                        src={app.image}
                        alt={app.title}
                        loading="lazy"
                        className="h-full w-full object-cover rounded-2xl transition-transform duration-200 group-hover:scale-105"
                    />
                </div>

                {/* -----------------App Details---------------------- */}
                <div className="flex flex-1 flex-col justify-around gap-4">
                    <div className="space-y-2">
                        <Link
                            to={`/apps/${app.id}`}
                            className="flex items-center gap-2 text-3xl font-semibold text-slate-900 hover:text-blue-600 transition-colors duration-200">
                            {app.title}
                        </Link>
                    </div>

               
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-2 p-2 rounded-lg text-green-900 bg-green-100">
                            <FaDownload className="h-3 w-3 text-green-800" />
                            {compactDownloads(app.downloads)} downloads
                        </span>

                        <span className="flex items-center gap-2 p-2 rounded-lg text-yellow-900 bg-yellow-100">
                            <FaStar className="text-amber-400" />
                            {app.ratingAvg.toFixed(1)} rating
                        </span>

                        {readableSize && (
                            <span className="flex items-center gap-2 p-2 rounded-lg text-blue-900 bg-blue-100">
                                <FaHdd className="h-3 w-3 text-blue-700" />
                                {readableSize}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* ---------------Uninstall Button------------------ */}
            <div>
                <button
                    type="button"
                    className="btn btn-primary bg-green-500 border-green-600 hover:scale-105"
                    onClick={() => onUninstall?.(app.id)}
                >
                    Uninstall
                </button>
            </div>
        </div>
    );
};

export default InstalledAppCard;
