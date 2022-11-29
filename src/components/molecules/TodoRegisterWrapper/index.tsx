import { ChangeEvent, FC, MutableRefObject } from 'react';
import { getToday } from '../../../libs/dayjs';
import { styles } from './styles';

type Props = {
  text: string;
  scheduledTime: string;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTime: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
};
export const TodoRegisterWrapper: FC<Props> = ({
  onClick,
  scheduledTime,
  text,
  onChange,
  onChangeTime,
  inputRef,
}) => {
  return (
    <form css={styles.root}>
      <div>
        <input
          type="text"
          onChange={onChange}
          value={text}
          css={[styles.input, styles.text]}
          placeholder="New Todo"
          ref={inputRef}
        />
        <input
          css={[styles.input, styles.time]}
          onChange={onChangeTime}
          type="date"
          value={scheduledTime}
          min={getToday('YYYY-MM-DD')}
        />
      </div>
      <button type="button" css={styles.button} onClick={onClick}>
        登録
      </button>
    </form>
  );
};
