import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button Component adhering to the FixMyArea Design System.
 * - Primary: Brand Yellow #FFD43B with black text and subtle hover lift
 * - Secondary: White with #EAEAEA border and subtle hover state
 * - Dark: #171717 black with white text
 * - Subtle: #FFF5CC light yellow with darker yellow hover
 * - Ghost: Transparent with soft hover
 * - Danger: Soft red warning
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 focus:ring-offset-1 select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer';

  const sizeStyles = {
    xs: 'text-xs px-2.5 py-1.5 rounded-[8px] gap-1.5',
    sm: 'text-xs px-3 py-1.5 rounded-[10px] gap-1.5 font-medium',
    md: 'text-sm px-4 py-2.5 rounded-[10px] gap-2 font-medium',
    lg: 'text-base px-5 py-3 rounded-[12px] gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#FFD43B] text-[#171717] hover:bg-[#F5C724] shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-[#E8BF2F]',
    secondary:
      'bg-white text-[#171717] border border-[#EAEAEA] hover:border-[#CCCCCC] hover:bg-[#FDFDFD] shadow-[0_1px_2px_rgba(0,0,0,0.03)]',
    dark:
      'bg-[#171717] text-white hover:bg-[#262626] shadow-[0_1px_2px_rgba(0,0,0,0.12)] border border-[#171717]',
    subtle:
      'bg-[#FFF5CC] text-[#171717] hover:bg-[#FFEAA0] border border-[#F5E296]',
    ghost:
      'bg-transparent text-[#171717] hover:bg-black/5 border border-transparent',
    outline:
      'bg-transparent text-[#171717] border border-[#EAEAEA] hover:border-[#171717] hover:bg-white',
    danger:
      'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : (
        LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!isLoading && RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
