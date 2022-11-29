import type { FC } from 'react';
import { changeTime, getToday } from '../../../libs/dayjs';
import { DeleteButton } from '../../atoms/DeleteButton';
import { Input } from '../../atoms/Input';
import { SelectBox } from '../../atoms/SelectBox';
import { AttendanceButtonWrapper } from '../../molecules/AttendanceButtonWrapper';
import { EditTodoModal } from '../../molecules/EditTodoModal';
import { TitleWrapper } from '../../molecules/TitleWrapper';
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
    <div css={styles.container}>
      <TitleWrapper title="TODOリスト" hasTopPageButton />
      <SelectBox />
      <AttendanceButtonWrapper />
      <form>
        <Input placeholder="New Todo" value={value.text} onChange={handleChange} ref={inputRef} />
        <input
          css={styles.input}
          onChange={handleChangeTime}
          type="date"
          value={value.scheduledTime}
          min={getToday('YYYY-MM-DD')}
        />
        <button
          type="button"
          css={[styles.button, styles.register]}
          onClick={() => handleClick(value.text)}>
          登録
        </button>
      </form>
      <div css={styles.body}>
        {list.length > 0 && (
          <div css={styles.searchWrapper}>
            <input
              placeholder="TODOを入力してください"
              css={styles.inputText}
              value={searchValue}
              onChange={handleSearch}
            />
            <div css={styles.listWrapper}>
              <ul css={[styles.list, styles.listBorder]}>
                <li css={styles.item}>TODO</li>
                <li css={styles.item}>登録日</li>
                <li css={styles.item}>予定日</li>
                <li css={styles.action}>アクション</li>
              </ul>
              <ul css={styles.listItem}>
                {list.map((item) => (
                  <li css={styles.list} key={item.id}>
                    <div css={styles.item}>{item.value}</div>
                    <div css={styles.item}>{changeTime(item.time, 'YYYY年MM月DD日')}</div>
                    <div css={styles.item}>{changeTime(item.scheduledTime, 'YYYY年MM月DD日')}</div>
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
                        css={[styles.button, styles.delete]}
                        onClick={() => handleComplete(item)}>
                        完了
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {completeList.length > 0 && (
          <div css={styles.searchWrapper}>
            <input
              placeholder="完了したTODOを入力してください"
              css={styles.inputText}
              value={searchCompleteValue}
              onChange={handleCompleteSearch}
            />
            <div css={styles.listWrapper}>
              <ul css={[styles.list, styles.listBorder]}>
                <li css={styles.item}>完了したTODO</li>
                <li css={styles.item}>完了日</li>
                <li css={styles.action}>アクション</li>
              </ul>
              <ul css={styles.listItem}>
                {completeList.map((item) => (
                  <li css={styles.list} key={item.id}>
                    <div css={styles.item}>{item.value}</div>
                    <div css={styles.item}>{changeTime(item.time, 'YYYY年MM月DD日')}</div>
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
              </ul>
            </div>
          </div>
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
