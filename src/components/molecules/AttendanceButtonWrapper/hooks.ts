import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { isEnterAttendance } from '../../../jotai/isEnterAttendance';
import { selectAttendance, Select } from '../../../jotai/selectAttendance';
import { getToday } from '../../../libs/dayjs';
import { useUserId } from '../../../libs/hooks/useUserId';

type FormValue = {
  id: string;
  attendanceTime: string;
  breakingOnTime?: string;
  breakingOffTime?: string;
  workedTime?: string;
  breakingTime?: number;
  select?: string;
};
export type Hooks = {
  select: Select | null;
  handleAttendanceClick: () => void;
  handleBreakingClick: (id: string) => void;
  handleBreakingOutClick: (value: FormValue | null, currentTime: number) => void;
  handleWorkedClick: (id: string) => void;
  handleInsert: (id: string) => void;
  handleReset: (id: string) => void;
  formValue: FormValue | null;
  resultBreakingTime: number;
};

export const useHooks = (): Hooks => {
  const [formValue, setFormValue] = useState<FormValue | null>(null);
  const [resultBreakingTime, setResultBreakingTime] = useState<number>(0);
  const supabase = useSupabaseClient();
  const [select, setSelect] = useAtom(selectAttendance);
  const [, setIsEnter] = useAtom(isEnterAttendance);
  const { userId } = useUserId();

  const getBreakingTime = useCallback((on: string, off: string) => {
    if (off.length === 0 || on.length === 0) return 0;
    const result = dayjs(off).diff(dayjs(on), 'm');
    return result;
  }, []);

  const fetch = useCallback(async () => {
    const datas = (await supabase.from('nowAttendance').select('*')).data;
    if (!datas) return;
    const result = datas.map((item) => ({
      id: item.id,
      attendanceTime: item.now_attendance,
      breakingOnTime: item.now_breaking_on,
      breakingOffTime: item.now_breaking_off,
      workedTime: item.now_worked,
      breakingTime: item.total_breaking_time,
      select: item.select,
    }));
    setFormValue(result[0]);
    setResultBreakingTime(result[0] ? result[0].breakingTime : 0);
    setSelect(result[0] ? result[0].select : null);
    setIsEnter(false);
  }, [supabase, setSelect, setIsEnter]);

  const handleAttendanceClick = useCallback(async () => {
    const today = getToday('YYYY-MM-DDTHH:mm');
    await supabase.from('nowAttendance').insert({
      now_attendance: today,
      userid: userId,
      select: 'attendance',
    });
    fetch();
  }, [supabase, userId, fetch]);

  const handleBreakingClick = useCallback(
    async (id: string) => {
      const today = getToday('YYYY-MM-DDTHH:mm');
      await supabase
        .from('nowAttendance')
        .update({
          now_breaking_on: today,
          select: 'breaking',
        })
        .eq('id', id);
      fetch();
    },
    [supabase, fetch],
  );

  const handleBreakingOutClick = useCallback(
    async (value: FormValue | null, currentTime: number) => {
      if (!value) return;
      const today = getToday('YYYY-MM-DDTHH:mm');
      const breakingTime = currentTime + getBreakingTime(value.breakingOnTime ?? '', today);
      await supabase
        .from('nowAttendance')
        .update({
          now_breaking_off: today,
          total_breaking_time: breakingTime,
          select: 'breakingOut',
        })
        .eq('id', value.id);
      setResultBreakingTime(breakingTime);
      fetch();
    },
    [fetch, getBreakingTime, supabase],
  );

  const handleWorkedClick = useCallback(
    async (id: string) => {
      const today = getToday('YYYY-MM-DDTHH:mm');
      await supabase
        .from('nowAttendance')
        .update({
          now_worked: today,
          select: 'worked',
        })
        .eq('id', id);
      fetch();
    },
    [fetch, supabase],
  );

  const handleReset = useCallback(
    async (id: string) => {
      if (id === '') return;
      setFormValue(null);
      setResultBreakingTime(0);
      await supabase.from('nowAttendance').delete().eq('id', id);
      fetch();
    },
    [fetch, supabase],
  );

  const handleInsert = useCallback(
    async (id: string) => {
      await supabase.from('attendance').insert({
        attendance_time: formValue?.attendanceTime,
        userid: userId,
        breaking_time: resultBreakingTime,
        worked_time: formValue?.workedTime,
      });
      handleReset(id);
      setIsEnter(true);
    },
    [
      formValue?.attendanceTime,
      formValue?.workedTime,
      handleReset,
      resultBreakingTime,
      setIsEnter,
      supabase,
      userId,
    ],
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    handleAttendanceClick,
    handleBreakingClick,
    handleBreakingOutClick,
    handleWorkedClick,
    select,
    handleInsert,
    handleReset,
    formValue,
    resultBreakingTime,
  };
};
