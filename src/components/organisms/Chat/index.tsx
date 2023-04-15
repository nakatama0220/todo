import type { FC } from 'react';
import { useHooks } from './hooks';
import { styles } from './styles';

export const Chat: FC = () => {
  const { handleChange, handleClick, list, value } = useHooks();
  return (
    <div css={styles.root}>
      <form css={styles.form}>
        <div>
          <input type="text" onChange={handleChange} value={value} css={styles.input} />
          <button type="button" css={styles.button} onClick={() => handleClick(value)}>
            登録
          </button>
        </div>
        <div>
          <button
            type="button"
            css={[styles.button, styles.active]}
            onClick={() => handleClick(value)}>
            再生
          </button>
          <button
            type="button"
            css={[styles.button, styles.stop]}
            onClick={() => handleClick(value)}>
            停止
          </button>
        </div>
      </form>
      <ul css={styles.list}>
        {list.map((item) => (
          <li key={item.id}>{item.chat}</li>
        ))}
      </ul>
    </div>
  );
};
