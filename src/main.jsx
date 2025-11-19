import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider
            router={router}
            
            fallbackElement={(
                <div className="min-h-screen grid place-items-center bg-gray-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600" aria-label="Loading"></div>
                </div>
            )}
        />
        <Toaster
          
            position="bottom-center"
            toastOptions={{
                style: {
                   
                    background: '#ffffff', 
                    color: '#1f2937', 
                    borderRadius: '0.5rem', 
                    paddingInline: '1rem', 
                    paddingBlock: '0.75rem',
                    border: '1px solid #e5e7eb', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', 
                },
            }}
        />
    </StrictMode>,
);