import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaDownload } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa'; 



const formatNumber = (value) =>
    new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

const AppCard = ({ app, variant = 'default', className = '' }) => {
    if (!app) {
        return null;
    }

    const cardStyles =
        'group flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-lg';

    return (
        <Link to={`/apps/${app.id}`} className={`${cardStyles} ${className}`}>
            
            <div className="relative overflow-hidden rounded-t-xl bg-gray-200 h-40">
               
                    <img
                        src={app.image}
                        alt={app.title}
                        loading="lazy"
                        className="h-full w-full object-cover rounded-t-xl"
                    />
            
            </div>

            <div className="flex flex-1 flex-col justify-end p-4 space-y-2">
                
                <div className="space-y-1">
                    <h3 className="truncate text-base font-semibold text-slate-900">{app.title}</h3>
                </div>

                <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-xs font-medium text-green-700">
                        <FaDownload className="h-3 w-3" />
                        {formatNumber(app.downloads)}
                    </span>
                    
                    <span className="flex items-center gap-1 text-xs font-medium text-yellow-700">
                        <FaStar className="h-3 w-3" />
                        {app.ratingAvg.toFixed(1)}
                    </span>
                    
                </div>
            </div>
        </Link>
    );
};

export default AppCard;