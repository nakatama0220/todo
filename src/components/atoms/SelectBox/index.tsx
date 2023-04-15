import type { FC } from 'react';
import { useHooks } from './hooks';
import { styles } from './styles';

export const SelectBox: FC = () => {
  const { handleChange } = useHooks();
  return (
    <select css={styles.root} name="セレクトボックス" onChange={handleChange}>
      <option value="">選択してください</option>
      <option value=".">TOPページ</option>
      <option value="todo">TODOリスト</option>
      <option value="attendance">勤怠リスト</option>
      <option value="chat">チャット</option>
    </select>
  );
};
