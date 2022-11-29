import type { FC } from 'react';
import { LogoutButton } from '../../atoms/LogoutButton';
import { TopPageButton } from '../../atoms/TopPageButton';
import { styles } from './styles';

type Props = {
  title: string;
  hasTopPageButton?: boolean;
};
export const TitleWrapper: FC<Props> = ({ title, hasTopPageButton = false }) => {
  return (
    <div css={styles.root}>
      <h1 css={styles.title}>{title}</h1>
      {hasTopPageButton && <TopPageButton />}
      <LogoutButton />
    </div>
  );
};
