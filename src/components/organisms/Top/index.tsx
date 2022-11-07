import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { FC } from 'react';
import { SelectBox } from '../../atoms/SelectBox';
import { styles } from './styles';

export const Top: FC = () => {
  const supabase = useSupabaseClient();

  return (
    <div css={styles.root}>
      <div css={styles.wrapper}>
        <h1 css={styles.title}>トップページ</h1>
        <button css={styles.button} type="button" onClick={() => supabase.auth.signOut()}>
          ログアウト
        </button>
      </div>
      <SelectBox selectMenu="top" />
    </div>
  );
};
