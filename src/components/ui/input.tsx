import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  className = '',
  error,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <input 
        className={`
          w-full px-4 py-2 rounded border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input; 