import React, { useState } from 'react';

const Input = ({
    label,
    type = 'text',
    id,
    error,
    className = '',
    icon: Icon,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 ${isFocused ? 'text-indigo-600 scale-110' : 'text-slate-400'
                        }`}>
                        <Icon size={20} />
                    </div>
                )}
                <input
                    type={type}
                    id={id}
                    className={`
                        block w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 rounded-xl border shadow-sm 
                        transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                        sm:text-sm relative
                        ${error
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-slate-200 text-slate-900 placeholder-slate-400 hover:border-slate-300 focus:border-transparent'
                        }
                        ${isFocused && !error ? 'ring-2 ring-indigo-500 border-transparent shadow-lg' : ''}
                    `}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;

