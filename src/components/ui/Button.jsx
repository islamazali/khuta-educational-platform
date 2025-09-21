import React from 'react';
import { Link } from 'react-router-dom';

// Button Variants
const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-2 focus:ring-primary/50',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-2 focus:ring-secondary/50',
  outline: 'border border-primary text-primary hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary/50',
  ghost: 'text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/50',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500/50',
  white: 'bg-white text-background hover:bg-gray-100 focus:ring-2 focus:ring-gray-300'
};

// Size Variants
const SIZES = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
};
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  href,
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) => {
  // Base button classes
  const baseClasses = `
    inline-flex items-center justify-center 
    rounded-full 
    font-bold 
    transition-all duration-300 
    focus:outline-none 
    disabled:opacity-50 
    disabled:cursor-not-allowed
    ${VARIANTS[variant] || VARIANTS.primary}
    ${SIZES[size] || SIZES.md}
    ${className}
  `;

  // Common props for all button types
  const commonProps = {
    className: baseClasses,
    disabled,
    onClick,
    ...props
  };

  // If link with 'to' prop (React Router)
  if (to) {
    return <Link to={to} {...commonProps}>
        {children}
      </Link>;
  }

  // If external link
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {children}
      </a>;
  }

  // Standard button
  return <button type={type} {...commonProps}>
      {children}
    </button>;
};

// Predefined Button Components for Easy Use
const PrimaryButton = props => <Button variant="primary" {...props} />;
const SecondaryButton = props => <Button variant="secondary" {...props} />;
const OutlineButton = props => <Button variant="outline" {...props} />;
const GhostButton = props => <Button variant="ghost" {...props} />;
const DangerButton = props => <Button variant="danger" {...props} />;
const WhiteButton = props => <Button variant="white" {...props} />;

// Export all button types
export { Button, PrimaryButton, SecondaryButton, OutlineButton, GhostButton, DangerButton, WhiteButton };
export default Button;