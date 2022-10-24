import Head from 'next/head';
import type { FC } from 'react';
import { styles } from './styles';

export type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>リスト</title>
      </Head>
      <main css={styles.main}>{children}</main>
    </div>
  );
};
