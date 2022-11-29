import type { FC } from 'react';
import { getToday } from '../../../libs/dayjs';
import { Modal } from '../../atoms/Modal';
import type { Item } from '../../organisms/TodoList/hooks';
import { useHooks } from './hooks';
import { styles } from './styles';

type Props = {
  handleClose: () => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEdit: (item: Item) => void;
  edit: Item;
  handleEditTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const EditTodoModal: FC<Props> = ({
  handleClose,
  edit,
  handleEdit,
  handleEditChange,
  handleEditTime,
}) => {
  const { inputRef } = useHooks();
  return (
    <Modal handleClose={handleClose}>
      <div css={styles.root}>
        <form>
          <input
            type="text"
            placeholder="Edit Todo"
            value={edit.value}
            onChange={handleEditChange}
            ref={inputRef}
            css={styles.input}
          />
          <input
            css={[styles.input, styles.time]}
            onChange={handleEditTime}
            type="date"
            value={edit.scheduledTime}
            min={getToday('YYYY-MM-DD')}
          />
          <button
            type="button"
            css={[styles.button, styles.register]}
            onClick={() => handleEdit(edit)}>
            登録
          </button>
        </form>
        <button type="button" onClick={handleClose} css={[styles.button, styles.editButton]}>
          閉じる
        </button>
      </div>
    </Modal>
  );
};
