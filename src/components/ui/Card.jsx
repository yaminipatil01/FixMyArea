import React from 'react';

/**
 * Reusable Card component following the FixMyArea design system:
 * 14-16px radius, subtle border (#EAEAEA), crisp white background, and soft hover transition.
 */
export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  padding = 'md',
  onClick,
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const hoverClasses = hoverEffect
    ? 'hover:border-[#D0D0D0] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 cursor-pointer transition-all duration-200'
    : 'transition-colors duration-150';

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#EAEAEA] rounded-[16px] shadow-[0_2px_6px_rgba(0,0,0,0.03)] ${paddingStyles[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, className = '' }) => (
  <div className={`flex items-start justify-between gap-4 pb-4 border-b border-[#EAEAEA]/80 mb-4 ${className}`}>
    <div>
      <h3 className="text-base font-semibold text-[#171717]">{title}</h3>
      {subtitle && <p className="text-xs text-[#666666] mt-0.5">{subtitle}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default Card;
