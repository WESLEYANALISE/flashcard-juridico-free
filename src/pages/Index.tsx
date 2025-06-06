import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import StudyView from '@/components/StudyView';
import ImprovedStatsView from '@/components/ImprovedStatsView';
import ReviewView from '@/components/ReviewView';
import PlaylistView from '@/components/PlaylistView';
import SettingsView from '@/components/SettingsView';
import AuthPage from '@/components/AuthPage';
import { useFlashcards } from '@/hooks/useFlashcards';
import { useUserProfile } from '@/hooks/useUserProfile';
import { User } from '@supabase/supabase-js';

const Index = () => {
  const [activeView, setActiveView] = useState('study');
  const [hideNavbar, setHideNavbar] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: supabaseFlashcards = [] } = useFlashcards();
  const { data: userProfile } = useUserProfile();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const flashcards = supabaseFlashcards.map(card => ({
    id: card.id.toString(),
    question: card.pergunta,
    answer: card.resposta,
    category: card.area,
    difficulty: 'Médio' as const,
    studied: false,
    correctAnswers: 0,
    totalAttempts: 0,
    lastStudied: undefined,
  }));

  const handleUpdateFlashcard = (id: string, updates: any) => {
    console.log('Updating flashcard:', id, updates);
  };

  const handleStudyPlaylist = (playlistId: string) => {
    console.log('Studying playlist:', playlistId);
    setActiveView('study');
  };

  const handleStudyReview = (area: string, themes: string[]) => {
    console.log('Studying review:', area, themes);
    setActiveView('study');
  };

  const handleHideNavbar = (hide: boolean) => {
    setHideNavbar(hide);
  };

  // Show navbar only when on study view and not hiding it
  const shouldShowNavbar = activeView === 'study' && !hideNavbar;

  const renderActiveView = () => {
    switch (activeView) {
      case 'study':
        return (
          <StudyView 
            flashcards={flashcards} 
            onUpdateFlashcard={handleUpdateFlashcard}
            onHideNavbar={handleHideNavbar}
          />
        );
      case 'playlist':
        return (
          <PlaylistView 
            onClose={() => setActiveView('study')}
            onStudyPlaylist={handleStudyPlaylist}
          />
        );
      case 'stats':
        return <ImprovedStatsView onBack={() => setActiveView('study')} />;
      case 'review':
        return (
          <ReviewView 
            onStudyReview={handleStudyReview}
            onBack={() => setActiveView('study')}
          />
        );
      case 'settings':
        return (
          <SettingsView 
            onBack={() => setActiveView('study')}
          />
        );
      default:
        return (
          <StudyView 
            flashcards={flashcards} 
            onUpdateFlashcard={handleUpdateFlashcard}
            onHideNavbar={handleHideNavbar}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      {shouldShowNavbar && (
        <Navbar activeView={activeView} onViewChange={setActiveView} />
      )}
      {renderActiveView()}
    </div>
  );
};

export default Index;
