import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'max-w-lg',
    gradientHeader = false
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-[fade-in_0.2s_ease-out]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Glassmorphic Background overlay */}
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                {/* Modal panel */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className={`
                    inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl 
                    transform transition-all sm:my-8 sm:align-middle w-full ${maxWidth}
                    animate-[scale-in_0.3s_ease-out]
                `}>
                    <div className={`flex justify-between items-center px-6 py-4 border-b border-slate-100 ${gradientHeader ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0' : ''
                        }`}>
                        <h3 className={`text-lg font-semibold ${gradientHeader ? 'text-white' : 'text-slate-900'}`} id="modal-title">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className={`rounded-full p-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${gradientHeader
                                    ? 'bg-white/20 text-white hover:bg-white/30 focus:ring-white'
                                    : 'bg-white text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:ring-indigo-500'
                                }`}
                        >
                            <span className="sr-only">Close</span>
                            <X size={20} />
                        </button>
                    </div>
                    <div className="px-6 py-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

