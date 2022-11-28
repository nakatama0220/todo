import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCallback, useEffect, useState } from 'react';
import { getToday } from '../../../libs/dayjs';

export type Hooks = {
  nowTime: string;
  handleSignOut: () => void;
};

export const useHooks = (): Hooks => {
  const [nowTime, setNowTime] = useState<string>(getToday('YYYY年MM月DD日HH時mm分'));
  const supabase = useSupabaseClient();

  const handleSignOut = useCallback(() => {
    supabase.auth.signOut();
  }, [supabase.auth]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNowTime(getToday('YYYY年MM月DD日HH時mm分'));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return {
    nowTime,
    handleSignOut,
  };
};
