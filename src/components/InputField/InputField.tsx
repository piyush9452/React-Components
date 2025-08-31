import React, { useState } from 'react';
import clsx from 'clsx';

// Ensure clsx is properly imported
const classNames = clsx;

/**
 * Props for the InputField component
 */
export interface InputFieldProps {
  /** Current value of the input field */
  value?: string;
  /** Handler that is called when the input value changes */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Label text displayed above the input */
  label?: string;
  /** Placeholder text displayed when the input is empty */
  placeholder?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error message displayed when the input is invalid */
  errorMessage?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is in an invalid state */
  invalid?: boolean;
  /** Visual style variant of the input */
  variant?: 'filled' | 'outlined' | 'ghost';
  /** Size of the input field */
  size?: 'sm' | 'md' | 'lg';
  /** HTML input type (text, password, email, etc.) */
  type?: string;
  /** Whether to show a button to clear the input value */
  showClearButton?: boolean;
  /** Whether to show a button to toggle password visibility (only for password type) */
  showPasswordToggle?: boolean;
  /** Additional CSS class names to apply to the input */
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  showPasswordToggle = false,
  className,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };

  const handleClear = () => {
    const clearedEvent = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    setInputValue('');
    onChange && onChange(clearedEvent);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Size classes
  const sizeClasses = {
    sm: 'h-8 text-xs px-2',
    md: 'h-10 text-sm px-3',
    lg: 'h-12 text-base px-4',
  }[size];

  // Variant classes
  const variantClasses = {
    filled: 'bg-gray-100 dark:bg-gray-700 border-transparent',
    outlined: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600',
    ghost: 'bg-transparent border-transparent',
  }[variant];

  // State classes
  const stateClasses = classNames({
    'border-red-500 dark:border-red-400': invalid,
    'opacity-60 cursor-not-allowed': disabled,
    'border-blue-500 dark:border-blue-400': isFocused && !invalid,
  });

  const inputClasses = classNames(
    'w-full rounded-md border transition-colors focus:outline-none',
    sizeClasses,
    variantClasses,
    stateClasses,
    className
  );

  const labelClasses = classNames('block text-sm font-medium mb-1', {
    'text-gray-700 dark:text-gray-300': !invalid,
    'text-red-500 dark:text-red-400': invalid,
  });

  const helperTextClasses = classNames('text-xs mt-1', {
    'text-gray-500 dark:text-gray-400': !invalid && !errorMessage,
    'text-red-500 dark:text-red-400': invalid || errorMessage,
  });

  const iconButtonClasses = 'absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300';

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={`input-${label}`} className={labelClasses}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={`input-${label}`}
          type={inputType}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={helperText || errorMessage ? `helper-${label}` : undefined}
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {showClearButton && inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className={`${iconButtonClasses} right-8`}
            aria-label="Clear input"
          >
            ✕
          </button>
        )}
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={iconButtonClasses}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {(helperText || errorMessage) && (
        <p id={`helper-${label}`} className={helperTextClasses}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;