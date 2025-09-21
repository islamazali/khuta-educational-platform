// Import React for creating the reusable Button component
import React from "react";

// Button component with customizable props for styling and behavior
function Button({
  children,
  variant = "primary",
  size = "medium",
  icon = null,
  iconPosition = "right",
  href = null,
  onClick = () => {},
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  const baseClasses = "btn-arabic font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-[#ff6b6b] to-[#ffd93d] text-black hover:opacity-90",
    secondary: "bg-zinc-800/50 border border-white/10 text-white hover:bg-zinc-700/50 hover:border-white/20",
    success: "bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-white hover:opacity-90",
    danger: "bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white hover:opacity-90",
    outline: "border-2 border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white",
    ghost: "text-zinc-400 hover:text-white hover:bg-white/5"
  };
  const sizes = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-3 text-base",
    large: "px-6 py-4 text-lg"
  };
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;
  const content = <>
      {icon && iconPosition === "left" && <i className={icon}></i>}
      {children}
      {icon && iconPosition === "right" && <i className={icon}></i>}
    </>;
  if (href) {
    return <a href={href} className={classes} onClick={onClick} {...props}>
        {content}
      </a>;
  }

  // Render the button with dynamic classes and event handler
  return <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      {content}
    </button>;
}

// Export the Button component for use across the application
export default Button;
export { Button };