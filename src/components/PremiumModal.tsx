
import React from 'react';
import { X, Crown, Zap, BookOpen, BarChart3, Smartphone, Headphones, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardsStudied: number;
  dailyLimit: number;
}

const detectPlatform = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/android/.test(userAgent)) {
    return 'android';
  }
  return 'web';
};

const getStoreUrl = () => {
  const platform = detectPlatform();
  
  switch (platform) {
    case 'ios':
      return 'https://apps.apple.com/us/app/direito-premium/id6451451647';
    case 'android':
      return 'https://play.google.com/store/apps/details?id=br.com.app.gpu2994564.gpub492f9e6db037057aaa93d7adfa9e3e0';
    default:
      return 'https://apps.apple.com/us/app/direito-premium/id6451451647';
  }
};

const PremiumModal = ({ isOpen, onClose, cardsStudied, dailyLimit }: PremiumModalProps) => {
  if (!isOpen) return null;

  const handleUpgrade = () => {
    const storeUrl = getStoreUrl();
    window.open(storeUrl, '_blank');
  };

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Cards Ilimitados",
      description: "Estude quantos quiser por dia, sem limitações"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-400" />,
      title: "+10.000 Flashcards",
      description: "Acesso completo ao banco de questões jurídicas"
    },
    {
      icon: <Crown className="w-6 h-6 text-purple-400" />,
      title: "Todas as Áreas",
      description: "Civil, Penal, Administrativo, Tributário e mais"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-green-400" />,
      title: "Modo Offline",
      description: "Estude sem internet, em qualquer lugar"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-orange-400" />,
      title: "Estatísticas Avançadas",
      description: "Relatórios detalhados de desempenho"
    },
    {
      icon: <Headphones className="w-6 h-6 text-pink-400" />,
      title: "IA de Revisão",
      description: "Sistema inteligente de repetição espaçada"
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-400" />,
      title: "Suporte Premium",
      description: "Chat direto com nossa equipe especializada"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-400" />,
      title: "Acesso Prioritário",
      description: "Novos conteúdos e funcionalidades primeiro"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl border border-white/20 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Upgrade Premium</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-netflix-red to-red-600 rounded-xl p-4 mb-4">
            <h3 className="text-xl font-bold text-white mb-2">
              Limite Diário Atingido!
            </h3>
            <p className="text-white/90 text-sm">
              Você estudou {cardsStudied} de {dailyLimit} cards gratuitos hoje
            </p>
          </div>
          <p className="text-gray-300 text-sm">
            Desbloqueie o potencial completo do seu estudo jurídico
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">
                  {benefit.title}
                </h4>
                <p className="text-gray-400 text-xs">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 
                       text-black font-bold py-4 text-lg transition-all duration-300 hover:scale-105"
          >
            <Crown className="w-5 h-5 mr-2" />
            Ser Premium Agora
          </Button>
          
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Continuar Amanhã
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Redefina seu limite às 00:00 ou upgrade para acesso ilimitado
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
