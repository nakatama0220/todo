import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { selectAttendance, Select } from '../../../jotai/selectAttendance';
import { getToday } from '../../../libs/dayjs';
import { useUserId } from '../../../libs/hooks/useUserId';

export type Hooks = {
  select: Select | null;
  handleAttendanceClick: () => void;
  handleBreakingClick: () => void;
  handleBreakingOutClick: () => void;
  handleWorkedClick: () => void;
  handleInsert: () => void;
  handleReset: () => void;
};

export const useHooks = (): Hooks => {
  const [attendanceTime, setAttendanceTime] = useState<string>('');
  const [breakingTime, setBreakingTime] = useState<string>('');
  const [workedTime, setWorkedTime] = useState<string>('');
  const [resultBreakingTime, setResultBreakingTime] = useState<number>(0);
  const supabase = useSupabaseClient();
  const [select, setSelect] = useAtom(selectAttendance);
  const { userId } = useUserId();

  const getBreakingTime = useCallback(
    (time: string) => {
      if (time.length === 0 || breakingTime.length === 0) return 0;
      const result = dayjs(time).diff(dayjs(breakingTime), 'm');
      return result;
    },
    [breakingTime],
  );

  const handleAttendanceClick = useCallback(() => {
    setSelect('attendance');
    setAttendanceTime(getToday('YYYY-MM-DDTHH:mm'));
  }, [setSelect]);

  const handleBreakingClick = useCallback(() => {
    setSelect('breaking');
    setBreakingTime(getToday('YYYY-MM-DDTHH:mm'));
  }, [setSelect]);

  const handleBreakingOutClick = useCallback(() => {
    setSelect('breakingOut');
    setResultBreakingTime((prev) => prev + getBreakingTime(getToday('YYYY-MM-DDTHH:mm')));
  }, [getBreakingTime, setSelect]);

  const handleWorkedClick = useCallback(() => {
    setSelect('worked');
    setWorkedTime(getToday('YYYY-MM-DDTHH:mm'));
  }, [setSelect]);

  const handleReset = useCallback(() => {
    setAttendanceTime('');
    setBreakingTime('');
    setWorkedTime('');
    setResultBreakingTime(0);
    setSelect(null);
  }, [setSelect]);

  const handleInsert = useCallback(async () => {
    await supabase.from('attendance').insert({
      attendance_time: attendanceTime,
      userid: userId,
      breaking_time: resultBreakingTime,
      worked_time: workedTime,
    });
    handleReset();
  }, [attendanceTime, handleReset, resultBreakingTime, supabase, userId, workedTime]);

  return {
    handleAttendanceClick,
    handleBreakingClick,
    handleBreakingOutClick,
    handleWorkedClick,
    select,
    handleInsert,
    handleReset,
  };
};
