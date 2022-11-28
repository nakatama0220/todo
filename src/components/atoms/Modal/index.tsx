import type { FC } from 'react';
import { useHooks } from './hooks';
import { styles } from './styles';

type Props = {
  children: React.ReactNode;
  handleClose: () => void;
};

export const Modal: FC<Props> = ({ children, handleClose }) => {
  const { handleKeyDown } = useHooks(handleClose);

  return (
    <div css={styles.overlay} onKeyDown={handleKeyDown}>
      <div css={styles.root}>{children}</div>
    </div>
  );
};
