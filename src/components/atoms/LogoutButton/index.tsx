import type { FC } from 'react';
import { useHooks } from './hooks';
import { styles } from './styles';

export const LogoutButton: FC = () => {
  const { handleClick } = useHooks();

  return (
    <button css={styles.root} type="button" onClick={handleClick}>
      ログアウト
    </button>
  );
};
