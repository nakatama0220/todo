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
  placeholder: string;
};
export const TodoRegisterWrapper: FC<Props> = ({
  onClick,
  scheduledTime,
  text,
  onChange,
  onChangeTime,
  inputRef,
  placeholder,
}) => {
  return (
    <form>
      <input
        type="text"
        onChange={onChange}
        value={text}
        css={[styles.input, styles.text]}
        placeholder={placeholder}
        ref={inputRef}
      />
      <input
        css={[styles.input, styles.time]}
        onChange={onChangeTime}
        type="date"
        value={scheduledTime}
        min={getToday('YYYY-MM-DD')}
      />
      <button type="button" css={styles.button} onClick={onClick}>
        登録
      </button>
    </form>
  );
};
