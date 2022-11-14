import type { FC } from 'react';
import { SelectBox } from '../../atoms/SelectBox';
import { useHooks } from './hooks';
import { styles } from './styles';

export const Top: FC = () => {
  const {
    nowTime,
    handleAttendanceClick,
    handleBreakingClick,
    handleBreakingOutClick,
    handleWorkedClick,
    select,
    handleSignOut,
    handleInsert,
    handleReset,
  } = useHooks();

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
      <div css={styles.buttonWrapper}>
        <button
          type="button"
          css={[styles.attendanceButton, select === null ? styles.able : styles.disabled]}
          onClick={handleAttendanceClick}
          disabled={select === null ? false : true}>
          出勤
        </button>
        <button
          type="button"
          css={[
            styles.attendanceButton,
            select === 'attendance' || select === 'breakingOut' ? styles.able : styles.disabled,
          ]}
          onClick={handleBreakingClick}
          disabled={select === 'attendance' || select === 'breakingOut' ? false : true}>
          休憩開始
        </button>
        <button
          type="button"
          css={[styles.attendanceButton, select === 'breaking' ? styles.able : styles.disabled]}
          onClick={handleBreakingOutClick}
          disabled={select === 'breaking' ? false : true}>
          休憩終了
        </button>
        <button
          type="button"
          css={[
            styles.attendanceButton,
            select === 'attendance' || select === 'breakingOut' ? styles.able : styles.disabled,
          ]}
          onClick={handleWorkedClick}
          disabled={select === 'attendance' || select === 'breakingOut' ? false : true}>
          退勤
        </button>
        <button
          type="button"
          css={[
            styles.attendanceButton,
            select === 'worked' ? styles.enterButton : styles.disabled,
          ]}
          onClick={handleInsert}
          disabled={select === 'worked' ? false : true}>
          決定
        </button>
        <button
          type="button"
          css={[styles.attendanceButton, styles.resetButton]}
          onClick={handleReset}>
          リセット
        </button>
      </div>
    </div>
  );
};
