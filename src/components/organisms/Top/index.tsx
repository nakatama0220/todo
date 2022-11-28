import type { FC } from 'react';
import { SelectBox } from '../../atoms/SelectBox';
import { AttendanceButtonWrapper } from '../../molecules/AttendanceButtonWrapper';
import { useHooks } from './hooks';
import { styles } from './styles';

export const Top: FC = () => {
  const { nowTime, handleSignOut } = useHooks();

  return (
    <div css={styles.root}>
      <div css={styles.wrapper}>
        <h1 css={styles.title}>トップページ</h1>
        <button css={styles.button} type="button" onClick={handleSignOut}>
          ログアウト
        </button>
      </div>
      <span>{`現在の時刻: ${nowTime}`}</span>
      <SelectBox selectMenu="top" />
      <AttendanceButtonWrapper />
    </div>
  );
};
