'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  debounceMs?: number;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value: controlledValue,
  onChange,
  onSearch,
  debounceMs = 300,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className,
  disabled = false,
  loading = false,
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue || '');
  const debouncedValue = useDebounce(internalValue, debounceMs);

  // Handle controlled/uncontrolled value
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    if (onSearch && debouncedValue !== value) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch, value]);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setInternalValue('');
    onChange?.('');
    onSearch?.('');
  };

  const baseStyles = 'flex items-center rounded-md border transition-colors focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2';
  
  const variants = {
    default: 'border-secondary-300 bg-white hover:border-secondary-400',
    outlined: 'border-secondary-300 bg-transparent hover:border-secondary-400',
    filled: 'border-transparent bg-secondary-100 hover:bg-secondary-200',
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-4 text-base',
  };

  return (
    <div className={cn('relative', fullWidth && 'w-full', className)}>
      <div
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Search className="h-4 w-4 text-secondary-500 mr-2 flex-shrink-0" />
        
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none placeholder:text-secondary-500 disabled:cursor-not-allowed"
        />
        
        {loading && (
          <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-secondary-300 border-t-primary-600" />
        )}
        
        {value && !disabled && (
          <button
            onClick={handleClear}
            className="ml-2 p-1 text-secondary-500 hover:text-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
