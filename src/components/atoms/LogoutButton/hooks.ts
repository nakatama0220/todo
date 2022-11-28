import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
export type Hooks = {
  handleClick: () => void;
};

export const useHooks = (): Hooks => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleClick = useCallback(() => {
    supabase.auth.signOut();
    router.push('.');
  }, [supabase.auth, router]);

  return {
    handleClick,
  };
};
