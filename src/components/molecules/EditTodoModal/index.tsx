import type { FC } from 'react';
import { Modal } from '../../atoms/Modal';
import type { Item } from '../../organisms/TodoList/hooks';
import { TodoRegisterWrapper } from '../TodoRegisterWrapper';
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
        <TodoRegisterWrapper
          text={edit.value}
          scheduledTime={edit.scheduledTime}
          onClick={() => handleEdit(edit)}
          onChange={handleEditChange}
          onChangeTime={handleEditTime}
          inputRef={inputRef}
          placeholder="Edit Todo"
        />
        <button type="button" onClick={handleClose} css={[styles.button, styles.editButton]}>
          閉じる
        </button>
      </div>
    </Modal>
  );
};
