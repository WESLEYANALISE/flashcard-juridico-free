
import { useState, useEffect } from 'react';

const DAILY_LIMIT = 30;
const STORAGE_KEY = 'daily-cards-study';

interface DailyProgress {
  date: string;
  cardsStudied: number;
}

export const useDailyLimit = () => {
  const [cardsStudied, setCardsStudied] = useState(0);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (stored) {
      try {
        const progress: DailyProgress = JSON.parse(stored);
        
        // Se é um novo dia, reseta o contador
        if (progress.date !== today) {
          const newProgress = { date: today, cardsStudied: 0 };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
          setCardsStudied(0);
          setHasReachedLimit(false);
        } else {
          setCardsStudied(progress.cardsStudied);
          setHasReachedLimit(progress.cardsStudied >= DAILY_LIMIT);
        }
      } catch {
        // Se erro ao parsear, reseta
        const newProgress = { date: today, cardsStudied: 0 };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
        setCardsStudied(0);
        setHasReachedLimit(false);
      }
    } else {
      // Primeira vez, cria o registro
      const newProgress = { date: today, cardsStudied: 0 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    }
  }, []);

  const incrementCardCount = () => {
    const today = new Date().toDateString();
    const newCount = cardsStudied + 1;
    
    const progress: DailyProgress = {
      date: today,
      cardsStudied: newCount
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    setCardsStudied(newCount);
    
    if (newCount >= DAILY_LIMIT) {
      setHasReachedLimit(true);
    }
  };

  const getRemainingCards = () => {
    return Math.max(0, DAILY_LIMIT - cardsStudied);
  };

  const resetDailyLimit = () => {
    const today = new Date().toDateString();
    const progress: DailyProgress = { date: today, cardsStudied: 0 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    setCardsStudied(0);
    setHasReachedLimit(false);
  };

  return {
    cardsStudied,
    hasReachedLimit,
    remainingCards: getRemainingCards(),
    incrementCardCount,
    resetDailyLimit,
    dailyLimit: DAILY_LIMIT
  };
};
