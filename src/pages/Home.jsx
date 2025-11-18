import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGooglePlay, FaApple } from 'react-icons/fa6';
import { FaDownload, FaStar, FaCubes } from 'react-icons/fa'; 
import AppCard from '../components/AppCard.jsx'; 
import { getAllApps, getFeaturedApps, calculateAppStats } from '../utils/appService.js'; 
import hero from '../assets/hero.png';
import iconDownloads from '../assets/icon-downloads.png';
import iconRatings from '../assets/icon-ratings.png';
import iconReview from '../assets/icon-review.png';

const Home = () => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => { 
            setLoading(true);
            try {
                const data = await getAllApps(500); 
                if (isMounted) {
                    setApps(data);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Failed to fetch apps:", error);
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

  
    const featuredApps = useMemo(() => getFeaturedApps(apps, 8), [apps]);

    
    const stats = useMemo(() => calculateAppStats(apps), [apps]);
    const totalApps = apps.length;

    
    const stateCards = [
        { 
            title: "Total Downloads", 
            value: "29.6M", 
            change: "21% More Than Last Month", 
            icon: <img src={iconDownloads} alt="Downloads" className="h-5 w-5" />, 
            bgColor: "bg-transparent" 
        },
        { 
            title: "Total Reviews", 
            value: "906K", 
            change: "46% More Than Last Month", 
            icon: <img src={iconRatings} alt="Reviews" className="h-5 w-5" />, 
            bgColor: "bg-transparent" 
        },
        { 
            title: "Active Apps", 
            value: "132+", 
            change: `${totalApps} are live`, 
            icon: <img src={iconReview} alt="Apps" className="h-5 w-5" />, 
            bgColor: "bg-transparent" 
        },
    ];

    return (
        <div className="space-y-16">
            
            {/* ---------------- Banner Section ---------------------*/}
            <section className='max-w-[1400px] mx-auto pt-16 px-4 md:px-6 lg:px-8'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 text-center mb-4 leading-tight">
                        We Build <span className="text-purple-700">Productive</span> Apps
                    </h1>
                    <p className="mb-8 max-w-3xl text-lg text-gray-600 text-center mx-auto">
                        At HERO.IO, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting. Our goal is to turn your ideas into digital experiences that truly make an impact.
                    </p>
                </div>

                {/* --------------Banner button-------------- */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                    <a
                        href="https://play.google.com/store/apps"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-300 bg-white text-base font-semibold text-gray-800 shadow-md transition-all duration-200 hover:bg-gray-100 hover:shadow-lg"
                    >
                        <FaGooglePlay className="text-xl text-green-600" />
                        Google Play
                    </a>
                    <a
                        href="https://apps.apple.com/us/genre/ios/id36"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-300 bg-white text-base font-semibold text-gray-800 shadow-md transition-all duration-200 hover:bg-gray-100 hover:shadow-lg"
                    >
                        <FaApple className="text-xl text-blue-600" />
                        App Store
                    </a>
                </div>
                
                {/* ---------------Hero Image --------------*/}
                <div className="flex justify-center -mb-8">
                    <img
                        src={hero}
                        alt="Hero dashboard illustration"
                        className="max-w-4xl w-full h-auto"
                    />
                </div>
            </section>

            {/* ---------------- States Section --------------- */}
            <section className="w-full bg-purple-700 py-20 px-4 shadow-xl text-white">
                <div className='max-w-[1400px] mx-auto'>
                    <h1 className='text-center text-4xl md:text-5xl font-extrabold mb-12'>Trusted By Millions, Built For You</h1>
                    
                   
                    <div className='flex flex-col md:flex-row justify-around items-start md:items-center text-white space-y-8 md:space-y-0'>
                        {stateCards.map((card, index) => (
                            <div key={index} className='flex flex-col text-center w-full md:w-auto p-4'>
                                <div className='flex items-center justify-center mb-2'>
                                    {card.icon}
                                    <h3 className='text-sm font-medium uppercase ml-2 opacity-80'>{card.title}</h3>
                                </div>
                                <h1 className='text-5xl md:text-6xl font-bold mb-1'>{card.value}</h1>
                                <h3 className='text-sm font-light opacity-70'>{card.change}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

         
            <section id="trending-apps" className="space-y-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mb-20">
                <div className="flex flex-col items-center gap-2">
                    <h2 className='text-4xl font-bold text-gray-900'>Trending Apps</h2>
                    <p className="text-base text-gray-500">Explore All Trending Apps on the Market developed by us</p>
                </div>

                {/*------------ Loading State ------------------*/}
                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                         
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
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {featuredApps.map((app) => (
                            <AppCard key={app.id} app={app} />
                        ))}
                    </div>
                )}

                {/*------------- Show All Button ----------*/}
                <div className="flex justify-center pt-4">
                    <Link 
                        to="/apps" 
                        className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:bg-purple-700"
                    >
                        Show All
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;