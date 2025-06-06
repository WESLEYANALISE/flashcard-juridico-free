
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  is_premium: boolean;
  premium_expires_at: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as UserProfile;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useIsPremium = () => {
  const { data: profile } = useUserProfile();
  
  if (!profile) return false;
  
  // Se não tem data de expiração, é premium vitalício
  if (profile.is_premium && !profile.premium_expires_at) {
    return true;
  }
  
  // Se tem data de expiração, verifica se ainda está válido
  if (profile.is_premium && profile.premium_expires_at) {
    const expiryDate = new Date(profile.premium_expires_at);
    const now = new Date();
    return expiryDate > now;
  }
  
  return false;
};
