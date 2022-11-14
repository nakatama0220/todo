import dayjs from 'dayjs';

export const getToday = (format: string): string => {
  return dayjs().format(format);
};

export const changeTime = (time: string): string => {
  return dayjs(time).format('YYYY年MM月DD日');
};

export const changeTime2 = (time: string): string => {
  return dayjs(time).format('YYYY年MM月DD日HH時mm分');
};
