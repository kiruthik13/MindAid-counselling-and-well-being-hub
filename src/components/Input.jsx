import React from 'react';

const Input = ({
    label,
    type = 'text',
    id,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                className={`
          block w-full px-4 py-3 rounded-xl border shadow-sm transition-colors duration-200
          focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
          ${error
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-slate-200 text-slate-900 placeholder-slate-400 hover:border-slate-300'
                    }
        `}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Input;
