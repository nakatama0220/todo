import type { FC } from 'react';
import { SelectBox } from '../../atoms/SelectBox';
import { AttendanceButtonWrapper } from '../../molecules/AttendanceButtonWrapper';
import { TitleWrapper } from '../../molecules/TitleWrapper';
import { useHooks } from './hooks';
import { styles } from './styles';

export const Top: FC = () => {
  const { nowTime } = useHooks();

  return (
    <div css={styles.root}>
      <TitleWrapper title="トップページ" />
      <span>{`現在の時刻: ${nowTime}`}</span>
      <SelectBox />
      <AttendanceButtonWrapper />
    </div>
  );
};
