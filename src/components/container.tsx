import React, { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div 
      className={`container mx-auto px-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container; 