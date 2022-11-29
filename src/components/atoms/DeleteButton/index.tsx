import type { FC } from 'react';
import { styles } from './styles';

type Props = {
  onClick: () => void;
};
export const DeleteButton: FC<Props> = ({ onClick }) => {
  return (
    <button type="button" css={styles.root} onClick={onClick}>
      削除
    </button>
  );
};
