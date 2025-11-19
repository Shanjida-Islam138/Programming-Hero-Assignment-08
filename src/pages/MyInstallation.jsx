import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import InstalledAppCard from '../Components/InstalledAppCard.jsx'; 
import { FaSort } from 'react-icons/fa';
import {
    fetchApps,
    syncInstalledWithApps,
    uninstallApp,
} from '../utils/index.js';

const MyInstallation = () => {
  
    const [loading, setLoading] = useState(true);
    const [installedApps, setInstalledApps] = useState([]);
    const [sortCriterion, setSortCriterion] = useState('downloads-high-low'); 
    useEffect(() => {
        let isMounted = true;

        const loadInstalled = async () => {
            setLoading(true);
            const dataset = await fetchApps();
            const synced = syncInstalledWithApps(dataset);
            if (!isMounted) return;
            
            setInstalledApps(synced);
            setLoading(false);
        };

        loadInstalled();

        return () => { isMounted = false; };
    }, []);

 
    const handleUninstall = (id) => {
        uninstallApp(id);
        setInstalledApps((previous) => previous.filter((entry) => entry.id !== id));
        toast.success('App uninstalled successfully.');
    };

  
    const sortedAppsDisplay = useMemo(() => {
        const appsCopy = [...installedApps]; 
        if (sortCriterion === 'downloads-high-low') {
           
            return appsCopy.sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0));
        }

        if (sortCriterion === 'downloads-low-high') {
          
            return appsCopy.sort((a, b) => (a.downloads ?? 0) - (b.downloads ?? 0));
        }

        return appsCopy;
    }, [installedApps, sortCriterion]);

  
    return (
        <section className="space-y-12 py-16 max-w-[1200px] mx-auto px-6 bg-gray-50 min-h-[80vh]">
            
            {/*----------------- Title Section ------------ */}
            <div className="space-y-2 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900">Your Installed Apps</h1>
                <p className="mx-auto max-w-2xl text-base text-gray-600">
                    Explore All Trending Apps on the Market developed by us
                </p>
            </div>

            {/* -----------------Content Area --------------*/}
            {loading ? (
                
                <div className="space-y-6 pt-8">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div 
                            key={`loader-${index}`} 
                            className="h-40 rounded-3xl border border-slate-200 bg-white shadow-md overflow-hidden"
                        >
                            <div className="h-full w-full animate-pulse bg-slate-200" />
                        </div>
                    ))}
                </div>
            ) : installedApps.length > 0 ? (
             
                <>
              
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
                        <span className="text-xl font-bold text-slate-800">
                            {installedApps.length} Apps Found
                        </span>
                        
                     
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-600">Sort By Size:</span>
                            <select
                                className="select select-ghost w-auto max-w-xs text-sm border-slate-200 text-slate-700 bg-white font-semibold transition-colors focus:border-blue-500 focus:ring-0"
                                value={sortCriterion}
                                onChange={(event) => setSortCriterion(event.target.value)}
                            >
                                <option value="downloads-high-low">Downloads High → Low</option>
                                <option value="downloads-low-high">Downloads Low → High</option>
                            </select>
                            <FaSort className="text-slate-500" />
                        </div>
                    </div>

                    {/* -----------------App Cards------------ */}
                    <div className="space-y-4"> 
                        {sortedAppsDisplay.map((app) => (
                            <InstalledAppCard 
                                key={app.id} 
                                app={app} 
                                onUninstall={handleUninstall} 
                            />
                        ))}
                    </div>
                </>
            ) : (
                //---------- No Installations Found------------
                <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-lg">
                    <h2 className="text-2xl font-bold text-slate-900">It's quiet here...</h2>
                    <p className="mt-3 text-base text-slate-500">
                        No apps have been installed yet. Head over to the apps catalogue to find your favourites and install them!
                    </p>
                    <Link 
                        to="/apps" 
                       
                        className="btn bg-blue-600 text-white hover:bg-blue-700 mt-6 px-8 rounded-xl font-semibold transition-colors"
                    >
                        Browse Apps
                    </Link>
                </div>
            )}
        </section>
    );
};

export default MyInstallation;