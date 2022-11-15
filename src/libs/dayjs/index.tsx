import dayjs from 'dayjs';

export const getToday = (format: string): string => {
  return dayjs().format(format);
};

export const changeTime = (time: string, format: string): string => {
  return dayjs(time).format(format);
};
