import type { FC, ReactNode } from 'react';
import { styles } from './styles';

type Props = {
  children: ReactNode;
};
export const TodoBody: FC<Props> = ({ children }) => {
  return <div css={styles.root}>{children}</div>;
};
