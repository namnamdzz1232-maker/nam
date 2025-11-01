
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-emerald-600 focus:ring-emerald-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary',
  };
  
  const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
