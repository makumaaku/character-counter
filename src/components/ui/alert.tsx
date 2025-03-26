import React, { HTMLAttributes } from 'react';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    destructive: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800'
  };

  return (
    <div 
      className={`
        p-4 rounded-md border
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <p
      className={`text-sm ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export default Alert; 