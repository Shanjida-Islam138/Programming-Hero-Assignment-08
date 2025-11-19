import React, { useEffect, useMemo, useState } from 'react';
import AppCard from '../Components/AppCard.jsx';
import { getAllApps, filterAppsByTitle, sortAppsByDownloads } from '../utils/index.js';
import { FaSearch } from 'react-icons/fa'; 
import { IoIosArrowDown } from 'react-icons/io'; 

const sortOptions = [
    { value: 'default', label: 'Sort By Size' }, 
    { value: 'high-low', label: 'Downloads · High → Low' },
    { value: 'low-high', label: 'Downloads · Low → High' },
];

const Apps = () => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('default');
    const [searchLoading, setSearchLoading] = useState(false);
    const [visibleApps, setVisibleApps] = useState([]);

  
    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            setLoading(true);
            
            const data = await fetchApps(); 
            if (isMounted) {
                setApps(data);
                setLoading(false);
            }
        };

        load();

        return () => {
            isMounted = false;
        };
    }, []);

  
    useEffect(() => {
        if (!apps.length) {
            setVisibleApps([]);
            return;
        }

  
        setSearchLoading(true);
        const handle = setTimeout(() => {
        
            const searched = searchApps(apps, searchTerm);
            const sorted = sortByDownloads(searched, sortOrder);
            
            setVisibleApps(sorted);
            setSearchLoading(false);
        }, 320); 

        return () => clearTimeout(handle);
    }, [apps, searchTerm, sortOrder]);

    const totalAppCount = useMemo(() => apps.length, [apps]);

    return (
        <section className="space-y-12 py-16 max-w-[1400px] mx-auto px-4">
            
            {/*----------------- Title Section ------------ */}
            <div className="space-y-2 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900">Our All Applications</h1>
               
                <p className="mx-auto max-w-2xl text-base text-slate-500">
                    Explore All Apps on the Market developed by us. We code for Millions
                </p>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between px-0">
  
                <span className="shrink-0 text-xl font-semibold text-slate-700">
                    ({visibleApps.length}) Apps Found
                </span>

                <div className='flex flex-col sm:flex-row gap-4 w-full lg:w-3/5'>
                   
                    <div className="relative flex-1">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <FaSearch className='h-4 w-4'/>
                        </span>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search apps by title"
                           
                            className="input input-bordered w-full border-slate-300 bg-white pl-10 pr-4 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none rounded-lg h-12"
                        />
                    </div>
                    
                    {/* ------------------Dropdown --------------- */}
                    <div className="w-full sm:w-60 lg:w-48 relative">
                    
                        <select
                            className="select select-bordered w-full border-slate-300 text-sm font-medium text-slate-600 appearance-none bg-gray-100 pr-10 focus:border-purple-500 focus:outline-none rounded-lg h-12"
                            value={sortOrder}
                            onChange={(event) => setSortOrder(event.target.value)}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <IoIosArrowDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                    </div>
                </div>
            </div>

            {loading ? (
              
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
                
                    {Array.from({ length: 16 }).map((_, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm min-h-[250px] flex flex-col justify-between"
                        >
                            <div className="h-3/4 animate-pulse rounded-lg bg-gray-200/70 mb-4" />
                            <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200/70 mb-2' />
                            <div className='h-3 w-1/2 animate-pulse rounded bg-gray-200/70' />
                        </div>
                    ))}
                </div>
            ) : (
                <>
                   
                    {searchLoading ? (
                        <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/80 py-16 mt-8">
                            <span className="loading loading-spinner loading-lg text-purple-600" aria-label="Loading results" />
                        </div>
                    ) : visibleApps.length > 0 ? (
                        //--------- App Grid-------------
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {visibleApps.map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    ) : (
                      
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white/80 p-12 text-center mt-8">
                            <h2 className="text-2xl font-semibold text-slate-900">No App Found 😢</h2>
                            <p className="mt-3 text-base text-slate-500">
                                We couldn't find any app matching "{searchTerm}". Try adjusting your search or sorting filters.
                            </p>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default Apps;