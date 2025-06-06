
import { Scale } from 'lucide-react';
import { Category } from '@/types/flashcard';
import PremiumBadge from './PremiumBadge';

interface CategoryCardProps {
  category: Category;
  cardCount: number;
  studiedCount: number;
  isSelected: boolean;
  onClick: () => void;
  showPremiumBadge?: boolean;
}

const CategoryCard = ({
  category,
  cardCount,
  studiedCount,
  isSelected,
  onClick,
  showPremiumBadge = false
}: CategoryCardProps) => {
  const progressPercentage = cardCount > 0 ? studiedCount / cardCount * 100 : 0;

  return (
    <div 
      onClick={onClick} 
      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover-lift group ${
        isSelected ? 'ring-2 ring-netflix-red shadow-2xl' : ''
      }`} 
      style={{
        background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      
      {/* Premium Badge */}
      {showPremiumBadge && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full p-2 shadow-lg">
            <PremiumBadge variant="crown" size="sm" />
          </div>
        </div>
      )}
      
      <div className="relative p-6 py-[6px]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Scale 
              className="w-8 h-8 animate-pulse transition-all duration-300 group-hover:scale-110" 
              style={{ color: category.color }} 
            />
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Total Cards</div>
            <div className="text-lg font-semibold text-white">
              {cardCount}
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-netflix-red transition-colors">
          {category.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {category.description}
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <div 
            className="h-2 rounded-full transition-all duration-700 ease-out" 
            style={{
              width: `${progressPercentage}%`,
              background: `linear-gradient(90deg, ${category.color} 0%, ${category.color}80 100%)`
            }} 
          />
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{Math.round(progressPercentage)}% completo</span>
          <span>Toque para estudar</span>
        </div>
      </div>
      
      {/* Enhanced Hover Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" 
        style={{
          background: `radial-gradient(circle at center, ${category.color} 0%, transparent 70%)`
        }} 
      />
    </div>
  );
};

export default CategoryCard;
