import type { FC } from 'react';
import { SelectBox } from '../../atoms/SelectBox';
import { AttendanceButtonWrapper } from '../../molecules/AttendanceButtonWrapper';
import { useHooks } from './hooks';
import { styles } from './styles';

export const Attendance: FC = () => {
  const { handleTopPage, list, handleDelete, handleSignOut } = useHooks();

  return (
    <div css={styles.root}>
      <div css={styles.wrapper}>
        <h1 css={styles.title}>勤怠リスト</h1>
        <button type="button" css={styles.topPage} onClick={handleTopPage}>
          トップページに戻る
        </button>
        <button css={styles.button} type="button" onClick={handleSignOut}>
          ログアウト
        </button>
      </div>
      <SelectBox selectMenu="attendance" />
      <AttendanceButtonWrapper />
      {list.length > 0 && (
        <div css={styles.body}>
          <div css={styles.header}>
            <span css={styles.item}>出勤時間</span>
            <span css={styles.item}>休憩時間</span>
            <span css={styles.item}>退勤時間</span>
            <span css={styles.item}>トータル</span>
          </div>
          <ul css={styles.list}>
            {list.map((item) => (
              <li key={item.id} css={styles.listItem}>
                <span css={styles.item}>{item.attendanceTime}</span>
                <span css={styles.item}>{item.breakingTime}</span>
                <span css={styles.item}>{item.workedTime}</span>
                <span css={styles.item}>{item.totalScore}</span>
                <button
                  type="button"
                  css={styles.deleteButton}
                  onClick={() => handleDelete(item.id)}>
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
