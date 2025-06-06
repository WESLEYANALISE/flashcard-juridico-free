
import React from 'react';
import { Crown, Star, Lock } from 'lucide-react';

interface PremiumBadgeProps {
  variant?: 'crown' | 'star' | 'lock';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PremiumBadge = ({ variant = 'crown', size = 'md', className = '' }: PremiumBadgeProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconClasses = `${sizeClasses[size]} text-yellow-400`;

  const getIcon = () => {
    switch (variant) {
      case 'star':
        return <Star className={iconClasses} fill="currentColor" />;
      case 'lock':
        return <Lock className={iconClasses} />;
      default:
        return <Crown className={iconClasses} />;
    }
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {getIcon()}
    </div>
  );
};

export default PremiumBadge;
