import React from 'react';

// Glass Card Component
const GlassCard = ({
  children,
  className = '',
  variant = 'default',
  size = 'md'
}) => {
  // Variant styles
  const variantStyles = {
    default: 'bg-white/10 border-white/20',
    primary: 'bg-primary/10 border-primary/20',
    secondary: 'bg-secondary/10 border-secondary/20',
    danger: 'bg-red-500/10 border-red-500/20'
  };

  // Size variations
  const sizeStyles = {
    xs: 'p-2 rounded-md text-xs',
    sm: 'p-4 rounded-lg text-sm',
    md: 'p-6 rounded-xl text-base',
    lg: 'p-8 rounded-2xl text-lg',
    xl: 'p-10 rounded-3xl text-xl'
  };
  return <div className={`
        glass-card
        backdrop-blur-lg 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${className}
        border 
        shadow-2xl 
        transition-all 
        duration-300 
        hover:scale-105 
        hover:shadow-modal
        text-white
        rtl:text-right
        flex 
        flex-col 
        justify-center 
        items-center
        space-y-4
        relative 
        overflow-hidden
      `}>
      {/* Glowing Blue Gradient Effect */}
      <div className="
          absolute 
          -top-1/2 
          -left-1/2 
          w-full 
          h-full 
          bg-gradient-to-br 
          from-primary/30 
          via-primary/10 
          to-transparent 
          rounded-full 
          animate-pulse 
          opacity-50
        " />

      {/* Card Content */}
      <div className="
          relative 
          z-10 
          text-center 
          flex 
          flex-col 
          items-center 
          justify-center
        ">
        {children}
      </div>
    </div>;
};

// Default Export with Pre-configured Variants
const DefaultGlassCard = ({
  className,
  ...props
}) => <GlassCard className={`
      min-w-[300px] 
      min-h-[200px] 
      ${className}
    `} {...props}>
    <span className="text-2xl font-bold">
      ✨ هذا كارت زجاجي خرافي
    </span>
  </GlassCard>;

// Export both the base component and a default configured version
export { GlassCard, DefaultGlassCard };
export default GlassCard;