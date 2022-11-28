import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Hooks = {
  userId: string;
};
export const useUserId = (): Hooks => {
  const supabase = useSupabaseClient();
  const [userId, setUserId] = useState<string>('');

  const getUserId = useCallback(async () => {
    const result = (await supabase.auth.getUser()).data.user?.id;
    if (!result) return;
    return setUserId(result);
  }, [supabase.auth]);

  useEffect(() => {
    getUserId();
  }, [getUserId]);

  return {
    userId: userId,
  };
};
