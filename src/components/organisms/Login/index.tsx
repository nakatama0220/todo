import type { FC } from 'react';
import { useHooks } from './hooks';
import { styles } from './styles';

export const Login: FC = () => {
  const { email, handleChangeEmail, handleChangePassword, handleLogin, password } = useHooks();

  return (
    <form css={styles.root}>
      <div css={styles.labelWrapper}>
        <label css={styles.label} htmlFor="email">
          Email address
        </label>
        <input
          css={styles.input}
          id="email"
          value={email}
          placeholder="Email"
          onChange={handleChangeEmail}
        />
      </div>
      <div css={styles.labelWrapper}>
        <label css={styles.label} htmlFor="password">
          password
        </label>
        <input
          css={styles.input}
          value={password}
          placeholder="password"
          id="password"
          onChange={handleChangePassword}
        />
      </div>
      <button css={styles.button} type="button" onClick={handleLogin}>
        ログイン
      </button>
    </form>
  );
};
