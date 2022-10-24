import type { FC } from 'react';
import { useHooks } from './hooks';
import { styles } from './styles';

export type Props = {
  selectMenu: 'top' | 'todo';
};

export const SelectBox: FC<Props> = ({ selectMenu }) => {
  const { handleChange } = useHooks();
  return (
    <select css={styles.root} name="セレクトボックス" onChange={handleChange}>
      <option selected={selectMenu === 'top'} value=".">
        選択してください
      </option>
      <option selected={selectMenu === 'todo'} value="todo">
        TODOリスト
      </option>
    </select>
  );
};
