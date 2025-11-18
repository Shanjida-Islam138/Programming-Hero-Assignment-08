// src/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 work-sans-font">
            
            <Navbar />
            
            <div className="flex-grow">
                <div className="mx-auto max-w-[1400px]"> 
                    <Outlet />
                </div>
            </div>
            
            <Footer />
            
        </div>
    );
};

export default Layout;