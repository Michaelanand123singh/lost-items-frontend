import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
  text,
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const variants = {
    default: 'text-secondary-600',
    primary: 'text-primary-600',
    secondary: 'text-secondary-500',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <Loader2
        className={cn(
          'animate-spin',
          sizes[size],
          variants[variant]
        )}
      />
      {text && (
        <p className="mt-2 text-sm text-secondary-600">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
