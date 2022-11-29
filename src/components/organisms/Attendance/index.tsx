import type { FC } from 'react';
import { DeleteButton } from '../../atoms/DeleteButton';
import { SelectBox } from '../../atoms/SelectBox';
import { AttendanceButtonWrapper } from '../../molecules/AttendanceButtonWrapper';
import { TitleWrapper } from '../../molecules/TitleWrapper';
import { useHooks } from './hooks';
import { styles } from './styles';

export const Attendance: FC = () => {
  const { list, handleDelete } = useHooks();

  return (
    <div css={styles.root}>
      <TitleWrapper title="勤怠リスト" hasTopPageButton />
      <SelectBox />
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
                <DeleteButton onClick={() => handleDelete(item.id)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
