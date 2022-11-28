import { useEffect, useState } from 'react';
import { getToday } from '../../../libs/dayjs';

export type Hooks = {
  nowTime: string;
};

export const useHooks = (): Hooks => {
  const [nowTime, setNowTime] = useState<string>(getToday('YYYY年MM月DD日HH時mm分'));

  useEffect(() => {
    const interval = setInterval(() => {
      setNowTime(getToday('YYYY年MM月DD日HH時mm分'));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return {
    nowTime,
  };
};
