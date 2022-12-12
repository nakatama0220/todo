import type { FC } from 'react';
import { useHooks } from './hooks';
import { styles } from './styles';

export const AttendanceButtonWrapper: FC = () => {
  const {
    handleAttendanceClick,
    handleBreakingClick,
    handleBreakingOutClick,
    handleInsert,
    handleReset,
    handleWorkedClick,
    select,
    formValue,
    resultBreakingTime,
  } = useHooks();
  return (
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
        onClick={() => handleBreakingClick(formValue?.id ?? '')}
        disabled={select === 'attendance' || select === 'breakingOut' ? false : true}>
        休憩開始
      </button>
      <button
        type="button"
        css={[styles.attendanceButton, select === 'breaking' ? styles.able : styles.disabled]}
        onClick={() => handleBreakingOutClick(formValue, resultBreakingTime)}
        disabled={select === 'breaking' ? false : true}>
        休憩終了
      </button>
      <button
        type="button"
        css={[
          styles.attendanceButton,
          select === 'attendance' || select === 'breakingOut' ? styles.able : styles.disabled,
        ]}
        onClick={() => handleWorkedClick(formValue?.id ?? '')}
        disabled={select === 'attendance' || select === 'breakingOut' ? false : true}>
        退勤
      </button>
      <button
        type="button"
        css={[styles.attendanceButton, select === 'worked' ? styles.enterButton : styles.disabled]}
        onClick={() => handleInsert(formValue?.id ?? '')}
        disabled={select === 'worked' ? false : true}>
        決定
      </button>
      <button
        type="button"
        css={[styles.attendanceButton, styles.resetButton]}
        onClick={() => handleReset(formValue?.id ?? '')}>
        リセット
      </button>
    </div>
  );
};
