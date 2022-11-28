import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';
import { changeTime } from '../../../libs/dayjs';

type Item = {
  id: number;
  attendanceTime: string;
  breakingTime: string;
  workedTime: string;
  totalScore: string;
};
export type Hooks = {
  handleTopPage: () => void;
  list: Item[];
  handleDelete: (id: number) => void;
  handleSignOut: () => void;
};

export const useHooks = (): Hooks => {
  const router = useRouter();
  const [list, setList] = useState<Item[]>([]);
  const supabase = useSupabaseClient();

  const getTotalScore = useCallback(
    (attendanceTime: string, breakingTime: number, workedTime: string) => {
      if (attendanceTime.length === 0 || workedTime.length === 0) return 'None';
      const minute = dayjs(workedTime).diff(dayjs(attendanceTime), 'm');
      const hours = dayjs(workedTime).diff(dayjs(attendanceTime), 'h');
      const resultMinute = minute - breakingTime;
      if (hours > 0) {
        return `${hours}時${resultMinute}分`;
      }
      return `${resultMinute}分`;
    },
    [],
  );

  const fetch = useCallback(async () => {
    const datas = (await supabase.from('attendance').select('*')).data;
    if (!datas) return;
    const result = datas.map((item) => ({
      id: item.id,
      attendanceTime: changeTime(item.attendance_time, 'YYYY年MM月DD日HH時mm分'),
      breakingTime: `${item.breaking_time}分`,
      workedTime: changeTime(item.worked_time, 'YYYY年MM月DD日HH時mm分'),
      totalScore: getTotalScore(item.attendance_time, item.breaking_time, item.worked_time),
    }));
    setList(result);
  }, [getTotalScore, supabase]);

  const handleTopPage = useCallback(() => {
    router.push('.');
  }, [router]);

  const handleDelete = useCallback(
    async (id: number) => {
      await supabase.from('attendance').delete().eq('id', id);
      fetch();
    },
    [fetch, supabase],
  );

  const handleSignOut = useCallback(() => {
    supabase.auth.signOut();
    handleTopPage();
  }, [supabase.auth, handleTopPage]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    handleTopPage,
    list,
    handleDelete,
    handleSignOut,
  };
};
