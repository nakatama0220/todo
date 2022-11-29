import type { FC, ReactNode } from 'react';
import { styles } from './styles';

type Props = {
  children: ReactNode;
};
export const TodoBodyItem: FC<Props> = ({ children }) => {
  return <div css={styles.root}>{children}</div>;
};
