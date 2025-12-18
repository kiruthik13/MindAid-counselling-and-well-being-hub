import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    isLoading = false,
    type = 'button',
    onClick,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm relative overflow-hidden group";

    const variants = {
        primary: "border-transparent text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500 shadow-lg hover:shadow-xl hover:scale-[1.02]",
        secondary: "border-slate-200 text-slate-700 bg-white hover:bg-slate-50 focus:ring-indigo-500 hover:border-slate-300",
        outline: "border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50 focus:ring-indigo-500 hover:border-indigo-700",
        danger: "border-transparent text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:ring-red-500 shadow-lg hover:shadow-xl",
        gradient: "border-transparent text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 focus:ring-purple-500 shadow-lg hover:shadow-xl",
        success: "border-transparent text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:ring-green-500 shadow-lg hover:shadow-xl"
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading || props.disabled}
            onClick={onClick}
            {...props}
        >
            {/* Shine effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-[shimmer_1.5s_ease-in-out] pointer-events-none"></span>

            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="relative z-10">Processing...</span>
                </>
            ) : (
                <span className="relative z-10">{children}</span>
            )}
        </button>
    );
};

export default Button;

