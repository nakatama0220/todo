import type { FC } from 'react';
import { changeTime, getToday } from '../../../libs/dayjs';
import { DeleteButton } from '../../atoms/DeleteButton';
import { SelectBox } from '../../atoms/SelectBox';
import { AttendanceButtonWrapper } from '../../molecules/AttendanceButtonWrapper';
import { CommonList } from '../../molecules/CommonList';
import { EditTodoModal } from '../../molecules/EditTodoModal';
import { TitleWrapper } from '../../molecules/TitleWrapper';
import { TodoBody } from '../../molecules/TodoBody';
import { TodoBodyItem } from '../../molecules/TodoBodyItem';
import { TodoRegisterWrapper } from '../../molecules/TodoRegisterWrapper';
import { useHooks } from './hooks';
import { styles } from './styles';

export const TodoList: FC = () => {
  const {
    edit,
    handleChange,
    handleClick,
    handleClose,
    handleDelete,
    handleEdit,
    handleEditChange,
    handleOpen,
    inputRef,
    isOpen,
    list,
    value,
    handleComplete,
    completeList,
    handleCompleteDelete,
    handleReset,
    handleChangeTime,
    handleCompleteSearch,
    handleSearch,
    searchCompleteValue,
    searchValue,
    handleEditChangeTime,
  } = useHooks();

  return (
    <div css={styles.root}>
      <TitleWrapper title="TODOリスト" hasTopPageButton />
      <SelectBox />
      <AttendanceButtonWrapper />
      <div css={styles.registerWrapper}>
        <TodoRegisterWrapper
          text={value.text}
          scheduledTime={value.scheduledTime}
          onClick={() => handleClick(value.text)}
          onChange={handleChange}
          onChangeTime={handleChangeTime}
          inputRef={inputRef}
          placeholder="TODOを入力してください"
        />
      </div>
      <div css={styles.body}>
        {list.length > 0 && (
          <TodoBodyItem>
            <input
              placeholder="TODOを入力してください"
              css={styles.input}
              value={searchValue}
              onChange={handleSearch}
            />
            <TodoBody>
              <div css={[styles.list, styles.header]}>
                <span css={[styles.value, styles.headerItem]}>TODO</span>
                <span css={[styles.headerDate, styles.headerItem]}>登録日</span>
                <span css={[styles.headerDate, styles.headerItem]}>予定日</span>
                <span css={[styles.action, styles.headerItem]}>アクション</span>
              </div>
              <CommonList>
                {list.map((item) => (
                  <li css={styles.list} key={item.id}>
                    <div css={styles.value}>{item.value}</div>
                    <div>{changeTime(item.time, 'YYYY年MM月DD日')}</div>
                    <div>{changeTime(item.scheduledTime, 'YYYY年MM月DD日')}</div>
                    <div css={styles.buttonWrapper}>
                      <DeleteButton onClick={() => handleDelete(item.id)} />
                      <button
                        type="button"
                        css={[styles.button, styles.edit]}
                        onClick={() => handleOpen(item)}>
                        編集
                      </button>
                      <button
                        type="button"
                        css={[styles.button, styles.complete]}
                        onClick={() => handleComplete(item)}>
                        完了
                      </button>
                    </div>
                  </li>
                ))}
              </CommonList>
            </TodoBody>
          </TodoBodyItem>
        )}
        {completeList.length > 0 && (
          <TodoBodyItem>
            <input
              placeholder="完了したTODOを入力してください"
              css={styles.input}
              value={searchCompleteValue}
              onChange={handleCompleteSearch}
            />
            <TodoBody>
              <ul css={[styles.list, styles.header]}>
                <li css={[styles.value, styles.headerItem]}>完了したTODO</li>
                <li css={[styles.headerDate, styles.headerItem]}>完了日</li>
                <li css={[styles.action, styles.headerItem]}>アクション</li>
              </ul>
              <CommonList>
                {completeList.map((item) => (
                  <li css={styles.list} key={item.id}>
                    <div css={styles.value}>{item.value}</div>
                    <div>{changeTime(item.time, 'YYYY年MM月DD日')}</div>
                    <div css={styles.buttonWrapper}>
                      <button
                        type="button"
                        css={[styles.button, styles.edit]}
                        onClick={() => handleReset(item)}>
                        戻す
                      </button>
                      <DeleteButton onClick={() => handleCompleteDelete(item.id)} />
                    </div>
                  </li>
                ))}
              </CommonList>
            </TodoBody>
          </TodoBodyItem>
        )}
      </div>
      {isOpen && (
        <EditTodoModal
          handleClose={handleClose}
          edit={edit}
          handleEdit={handleEdit}
          handleEditChange={handleEditChange}
          handleEditTime={handleEditChangeTime}
        />
      )}
    </div>
  );
};
