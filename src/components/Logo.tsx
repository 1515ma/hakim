
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  withText = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  };

  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <img 
          src="/lovable-uploads/17cddbcd-9ccf-43db-8bae-2f82a30b30de.png" 
          alt="Hakim Logo" 
          className={`${sizeClasses[size]} w-auto object-contain transition-all duration-300 hover:opacity-90`}
        />
      </div>
      
      {withText && (
        <span className={`font-medium ${size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : size === 'xl' ? 'text-4xl' : 'text-2xl'} text-hakim-light transition-colors`}>
          Hakim
        </span>
      )}
    </Link>
  );
};

export default Logo;
