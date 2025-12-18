import { Toaster } from 'react-hot-toast';

/**
 * NotificationProvider Component
 * Provides premium-styled toast notifications throughout the app
 */
export const NotificationProvider = ({ children }) => {
    return (
        <>
            {children}
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Default options
                    className: '',
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                        fontWeight: '500',
                        fontSize: '14px',
                    },

                    // Success notifications
                    success: {
                        duration: 4000,
                        style: {
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: '#fff',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
                            fontWeight: '500',
                            fontSize: '14px',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#10b981',
                        },
                    },

                    // Error notifications
                    error: {
                        duration: 5000,
                        style: {
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: '#fff',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            boxShadow: '0 10px 40px rgba(239, 68, 68, 0.3)',
                            fontWeight: '500',
                            fontSize: '14px',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#ef4444',
                        },
                    },

                    // Loading notifications
                    loading: {
                        style: {
                            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                            color: '#fff',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)',
                            fontWeight: '500',
                            fontSize: '14px',
                        },
                    },
                }}
            />
        </>
    );
};
