import React from 'react';
import { STATUS_CONFIG } from '../../utils/constants';

/**
 * Reusable Badge component for issue statuses, categories, and tags.
 */
export const Badge = ({
  children,
  variant = 'default',
  status,
  size = 'md',
  className = '',
}) => {
  if (status && STATUS_CONFIG[status]) {
    const config = STATUS_CONFIG[status];
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color} ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
        {config.label}
      </span>
    );
  }

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium',
    lg: 'text-sm px-3 py-1.5 rounded-full font-medium',
  };

  const variantStyles = {
    default: 'bg-[#F7F7F5] text-[#171717] border border-[#EAEAEA]',
    yellow: 'bg-[#FFF5CC] text-[#171717] border border-[#FFD43B]/60',
    dark: 'bg-[#171717] text-white border border-[#171717]',
    outline: 'bg-white text-[#666666] border border-[#EAEAEA]',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-900 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.default
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
