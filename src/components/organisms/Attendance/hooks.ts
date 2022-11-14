import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';
import supabase from '../../../../utils/supabase';
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
};

export const useHooks = (): Hooks => {
  const router = useRouter();
  const [list, setList] = useState<Item[]>([]);

  const fetch = useCallback(async () => {
    const datas = (await supabase.from('attendance').select('*')).data;
    if (!datas) return;
    const result = datas.map((item) => ({
      id: item.id,
      attendanceTime: changeTime(item.attendance_time, 'YYYY年MM月DD日HH時mm分'),
      breakingTime: `${item.breaking_time}分`,
      workedTime: changeTime(item.worked_time, 'YYYY年MM月DD日HH時mm分'),
      totalScore: '',
    }));
    setList(result);
  }, []);

  const handleTopPage = useCallback(() => {
    router.push('.');
  }, [router]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    handleTopPage,
    list,
  };
};
