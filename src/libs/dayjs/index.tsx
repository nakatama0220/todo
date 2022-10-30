import dayjs from 'dayjs';

export const getToday = (): string => {
  return dayjs().format('YYYY-MM-DDTHH:mm');
};

export const changeTime = (time: string): string => {
  return dayjs(time).format('YYYY年MM月DD日');
};
