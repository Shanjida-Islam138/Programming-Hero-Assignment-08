import React, { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import error_404 from '../assets/error-404.png'; 

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            console.error('Routing error captured by Error boundary:', error);
        }
    }, [error]);

    const handleBack = () => {
     
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }
        navigate('/');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
    
            <main className="flex-grow flex items-center justify-center p-6 bg-gray-100">
                <section className="flex flex-col gap-4 items-center max-w-lg w-full text-center py-16">
                    
                    
                    <img 
                        src={error_404} 
                        alt="App Not Found Illustration" 
                       
                        className="w-80 h-auto mb-4" 
                    />

                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide mt-4">
                        OPPS!! APP NOT FOUND
                    </h1>
                    
                  
                    <p className="text-lg text-gray-600 mb-6">
                        The App you are requesting is not found on our system. please try another apps
                    </p>
                    
            
                    <button 
                        type="button" 
                       
                        className="btn bg-purple-600 text-white border-purple-600 hover:bg-purple-700 hover:border-purple-700 font-semibold text-lg px-8 py-3 rounded-xl shadow-md transition-colors duration-200" 
                        onClick={handleBack}
                    >
                        Go Back!
                    </button>
                    
                </section>
            </main>
            
            <Footer />
        </div>
    );
};

export default Error;