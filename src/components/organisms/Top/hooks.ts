import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCallback, useEffect, useState } from 'react';
import { getToday } from '../../../libs/dayjs';

type Select = 'attendance' | 'breaking' | 'breakingOut' | 'worked';

export type Hooks = {
  nowTime: string;
  select: Select | null;
  handleAttendanceClick: () => void;
  handleBreakingClick: () => void;
  handleBreakingOutClick: () => void;
  handleWorkedClick: () => void;
  handleSignOut: () => void;
};

export const useHooks = (): Hooks => {
  const [nowTime, setNowTime] = useState<string>(getToday('YYYY年MM月DD日HH時mm分'));
  const [select, setSelect] = useState<Select | null>(null);
  const supabase = useSupabaseClient();

  const handleSignOut = useCallback(() => {
    supabase.auth.signOut();
  }, [supabase.auth]);

  const handleAttendanceClick = useCallback(() => {
    setSelect('attendance');
  }, []);

  const handleBreakingClick = useCallback(() => {
    setSelect('breaking');
  }, []);

  const handleBreakingOutClick = useCallback(() => {
    setSelect('breakingOut');
  }, []);

  const handleWorkedClick = useCallback(() => {
    setSelect(null);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNowTime(getToday('YYYY年MM月DD日HH時mm分'));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return {
    nowTime,
    handleAttendanceClick,
    handleBreakingClick,
    handleBreakingOutClick,
    handleWorkedClick,
    select,
    handleSignOut,
  };
};
