import type { FC } from 'react';
import { SelectBox } from '../../atoms/SelectBox';
import { styles } from './styles';

export const Top: FC = () => {
  return (
    <div css={styles.root}>
      <h1 css={styles.title}>トップページ</h1>
      <SelectBox selectMenu="top" />
    </div>
  );
};
