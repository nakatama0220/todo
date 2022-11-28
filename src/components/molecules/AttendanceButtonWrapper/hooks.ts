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
};
export type Hooks = {
  select: Select | null;
  handleAttendanceClick: () => void;
  handleBreakingClick: (id: string) => void;
  handleBreakingOutClick: (id: string) => void;
  handleWorkedClick: (id: string) => void;
  handleInsert: (id: string) => void;
  handleReset: (id: string) => void;
  formValue: FormValue | null;
};

export const useHooks = (): Hooks => {
  const [formValue, setFormValue] = useState<FormValue | null>(null);
  const [resultBreakingTime, setResultBreakingTime] = useState<number>(0);
  const supabase = useSupabaseClient();
  const [select, setSelect] = useAtom(selectAttendance);
  const [, setIsEnter] = useAtom(isEnterAttendance);
  const { userId } = useUserId();

  const changeSelect = useCallback(
    (value: FormValue) => {
      if (value?.workedTime) {
        setSelect('worked');
        return;
      }
      if (value?.breakingOffTime) {
        setSelect('breakingOut');
        return;
      }
      if (value?.breakingOnTime) {
        setSelect('breaking');
        return;
      }
      if (value?.attendanceTime) {
        setSelect('attendance');
        return;
      }
      setSelect(null);
    },
    [setSelect],
  );

  const getBreakingTime = useCallback((value: FormValue) => {
    if (!value) return 0;
    if (value.breakingOffTime?.length === 0 || (value?.breakingOnTime ?? '').length === 0) return 0;
    const result = dayjs(value.breakingOffTime).diff(dayjs(value.breakingOnTime), 'm');
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
    }));
    setFormValue(result[0]);
    changeSelect(result[0]);
    setResultBreakingTime((prev) => prev + getBreakingTime(result[0]));
  }, [supabase, changeSelect, getBreakingTime]);

  const handleAttendanceClick = useCallback(async () => {
    const today = getToday('YYYY-MM-DDTHH:mm');
    await supabase.from('nowAttendance').insert({
      now_attendance: today,
      userid: userId,
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
        })
        .eq('id', id);
      fetch();
    },
    [supabase, fetch],
  );

  const handleBreakingOutClick = useCallback(
    async (id: string) => {
      const today = getToday('YYYY-MM-DDTHH:mm');
      await supabase
        .from('nowAttendance')
        .update({
          now_breaking_off: today,
        })
        .eq('id', id);
      fetch();
    },
    [fetch, supabase],
  );

  const handleWorkedClick = useCallback(
    async (id: string) => {
      const today = getToday('YYYY-MM-DDTHH:mm');
      await supabase
        .from('nowAttendance')
        .update({
          now_worked: today,
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
  };
};
