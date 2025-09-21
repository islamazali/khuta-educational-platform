import React, { forwardRef } from 'react';

// Input Variants
const VARIANTS = {
  default: 'border-gray-600 focus:border-primary focus:ring-primary',
  error: 'border-red-500 text-red-500 focus:border-red-500 focus:ring-red-500',
  success: 'border-green-500 text-green-500 focus:border-green-500 focus:ring-green-500'
};

// Input Sizes
const SIZES = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
  xl: 'px-6 py-4 text-xl'
};
const Input = forwardRef(({
  label,
  type = 'text',
  name,
  id,
  placeholder = '',
  variant = 'default',
  size = 'md',
  className = '',
  error,
  helperText,
  icon: Icon,
  required = false,
  disabled = false,
  ...props
}, ref) => {
  // Combine base input classes
  const inputClasses = `
    w-full 
    bg-background-light 
    text-white 
    rounded-lg 
    border 
    transition-all 
    duration-300 
    focus:outline-none 
    focus:ring-2 
    ${VARIANTS[variant] || VARIANTS.default}
    ${SIZES[size] || SIZES.md}
    ${Icon ? 'pl-10' : ''}
    ${error ? 'border-red-500' : ''}
    ${className}
  `;
  return <div className="space-y-2 w-full">
      {/* Label */}
      {label && <label htmlFor={id || name} className={`
            block 
            text-sm 
            font-medium 
            ${error ? 'text-red-500' : 'text-white'}
          `}>
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>}

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {Icon && <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center pr-3 rtl:pr-0 rtl:pl-3 pointer-events-none">
            <Icon className={`
                h-5 w-5 
                ${error ? 'text-red-500' : 'text-gray-400'}
              `} />
          </div>}

        {/* Input Element */}
        <input ref={ref} type={type} name={name} id={id || name} placeholder={placeholder} className={inputClasses} disabled={disabled} aria-invalid={error ? 'true' : 'false'} aria-describedby={`${name}-error`} {...props} />
      </div>

      {/* Error or Helper Text */}
      {(error || helperText) && <p id={`${name}-error`} className={`
            text-sm 
            mt-1 
            ${error ? 'text-red-500' : 'text-gray-400'}
          `}>
          {error || helperText}
        </p>}
    </div>;
});

// Predefined Input Types
const TextInput = props => <Input type="text" {...props} />;
const EmailInput = props => <Input type="email" {...props} />;
const PasswordInput = props => <Input type="password" {...props} />;
const NumberInput = props => <Input type="number" {...props} />;
const TextAreaInput = ({
  rows = 4,
  ...props
}) => <Input as="textarea" rows={rows} className="resize-y" {...props} />;

// Export all input types
export { Input, TextInput, EmailInput, PasswordInput, NumberInput, TextAreaInput };
export default Input;