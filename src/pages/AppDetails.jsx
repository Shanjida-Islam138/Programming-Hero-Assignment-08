import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { fetchAppById, installApp, isAppInstalled, ratingsToChartData, uninstallApp } from '../utils/index.js';
import InstallButton from '../Components/InstallButton.jsx'; 
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FaDownload, FaStar, FaUsers, FaArrowLeft } from 'react-icons/fa'; 
import app_not_found_image from '../assets/App-Error.png'; 


const formatCompactNumber = (value) =>
    new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(value ?? 0);


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-lg ring-1 ring-black/5">
                <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
                <p className="text-xl font-bold text-orange-500 mt-0.5">{payload[0].value.toLocaleString()} reviews</p>
            </div>
        );
    }
    return null;
};

const AppDetails = () => {
    const { appId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [app, setApp] = useState(null);
    const [installed, setInstalled] = useState(false);

   
    const handleNavigateBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            navigate(-1);
            return;
        }
        navigate('/apps');
    };

    useEffect(() => {
        let isMounted = true;
        const loadApp = async () => {
            setLoading(true);
            const result = await fetchAppById(appId);
            if (!isMounted) return;

            if (!result) {
                setApp(null);
                setLoading(false);
                return;
            }

            setApp(result);
            setLoading(false);
            setInstalled(isAppInstalled(result.id));
        };
        loadApp();
        return () => { isMounted = false; };
    }, [appId]);

    const handleInstall = () => {
        if (!app) return;
        installApp(app);
        setInstalled(true);
        toast.success(`${app.title} installed successfully!`);
    };

    const handleUninstall = () => {
        if (!app) return;
        uninstallApp(app.id);
        setInstalled(false);
        toast.success(`${app.title} removed from My Installation.`);
    };
   
 
    if (loading) {
        return (
            <section className="py-20 flex items-center justify-center min-h-[50vh] bg-gray-50">
                <span className="loading loading-spinner loading-lg text-blue-600" aria-label="Loading app details" />
            </section>
        );
    }

   
    if (!app) {
        return (
            <div className="flex flex-col gap-4 items-center bg-white m-10 p-10 rounded-xl shadow-lg max-w-lg mx-auto">
                <img src={app_not_found_image} alt="404 Error" className="max-h-60 w-auto" />
                <h1 className="text-3xl font-bold text-red-600">APP NOT FOUND (404)</h1>
                <p className='text-gray-600 text-center'>The application ID you requested could not be found on our system. Please check the URL and try again.</p>
                <button
                    type="button"
                    className="btn bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-2 rounded-lg transition"
                    onClick={handleNavigateBack}>
                    <FaArrowLeft className="mr-2" /> Go Back to Apps
                </button>
            </div>
        );
    }

    const chartData = ratingsToChartData(app.ratings ?? []);

    return (
        <section className="space-y-12 py-12 max-w-[1200px] mx-auto px-4 bg-gray-50 min-h-screen">
            
            
            <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        
                        
                        <div className="relative aspect-square w-full h-auto overflow-hidden rounded-3xl lg:w-60 lg:h-60 lg:shrink-0 bg-blue-100 flex items-center justify-center p-4">
                            <img
                                src={app.image}
                                alt={app.title}
                                className="h-full w-full object-contain rounded-2xl"
                            />
                        </div>
                        
                        
                        <div className="flex flex-1 flex-col justify-between gap-6">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h1 className="text-4xl font-extrabold text-slate-900">{app.title}</h1>
                                    <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                                        Developed By: <span className="text-blue-600 font-bold">{app.companyName}</span>
                                    </p>
                                </div>
                                
                                
                                <div className="grid gap-4 sm:grid-cols-3 pt-2">
                                    
                                  
                                    <div className="flex flex-col items-start gap-1 p-3 bg-blue-50 rounded-lg">
                                        <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                                            <FaDownload aria-hidden="true" /> Downloads
                                        </span>
                                        <span className="text-2xl font-bold text-slate-900">
                                            {formatCompactNumber(app.downloads)}
                                        </span>
                                    </div>
                                    
                                  
                                    <div className="flex flex-col items-start gap-1 p-3 bg-amber-50 rounded-lg">
                                        <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                                            <FaStar aria-hidden="true" /> Average Rating
                                        </span>
                                        <span className="text-2xl font-bold text-slate-900">
                                            {app.ratingAvg.toFixed(1)}
                                        </span>
                                    </div>
                                    
                                   
                                    <div className="flex flex-col items-start gap-1 p-3 bg-purple-50 rounded-lg">
                                        <span className="flex items-center gap-1 text-sm font-semibold text-purple-600">
                                            <FaUsers aria-hidden="true" /> Total Reviews
                                        </span>
                                        <span className="text-2xl font-bold text-slate-900">
                                            {formatCompactNumber(app.reviews)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                           
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-4">
                                <InstallButton
                                    installed={installed}
                                    onInstall={handleInstall}
                                    label={`Install Now (${app.size} MB)`}
                                    
                                    className="bg-[#00D390] text-slate-900 hover:bg-[#11e2a0] text-lg font-bold rounded-xl px-8"
                                />
                                {installed && (
                                    <button
                                        type="button"
                                        className="btn bg-white border-red-300 text-red-600 hover:bg-red-50 hover:border-red-500 font-semibold rounded-xl px-8 transition-colors"
                                        onClick={handleUninstall}
                                    >
                                        Uninstall
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Ratings</h3>
                
              
                <div className="mt-4 h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" horizontal={false} />
                            
                            
                            <XAxis 
                                type="number" 
                                stroke="#475569" 
                                tickLine={false}
                                axisLine={false}
                               
                                tickFormatter={(value) => (value > 0 ? value.toLocaleString() : '')}
                                domain={[0, 'auto']}
                            />
                            
                            
                            <YAxis 
                                type="category" 
                                dataKey="name" 
                                stroke="#475569" 
                                tickLine={false}
                                axisLine={false}
                            />
                            
                           
                            <Tooltip content={<CustomTooltip />} />
                            
                          
                            <Bar 
                                dataKey="value" 
                                fill="#FF8811" 
                                radius={[0, 8, 8, 0]} 
                                barSize={20}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
           
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Description</h2>
               
                {app.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mt-4 text-base text-slate-600 leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </div>

        </section>
    );
};

export default AppDetails;