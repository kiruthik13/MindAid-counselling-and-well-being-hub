import React from 'react';

const Card = ({
    children,
    className = '',
    title,
    subtitle,
    action,
    variant = 'default', // default, glass, gradient-border
    hover = true
}) => {
    const variants = {
        default: 'bg-white border border-slate-100',
        glass: 'glass-card',
        'gradient-border': 'bg-white gradient-border'
    };

    const hoverClass = hover ? 'hover-lift' : '';

    return (
        <div className={`rounded-2xl shadow-sm overflow-hidden transition-all duration-200 ${variants[variant]} ${hoverClass} ${className}`}>
            {(title || subtitle || action) && (
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
                        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default Card;

