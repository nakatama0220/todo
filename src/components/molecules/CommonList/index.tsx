import type { FC, ReactNode } from 'react';
import { styles } from './styles';

type Props = {
  children: ReactNode;
};
export const CommonList: FC<Props> = ({ children }) => {
  return <ul css={styles.root}>{children}</ul>;
};
