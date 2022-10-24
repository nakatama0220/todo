import dayjs from 'dayjs';

export const getToday = (): string => {
  return dayjs().format('YYYY-MM-DDTHH:mm');
};
