import type { FC } from 'react';
import { Input } from '../../atoms/Input';
import { SelectBox } from '../../atoms/SelectBox';
import { useHooks } from './hooks';
import { styles } from './styles';

export const TodoList: FC = () => {
  const {
    edit,
    editInputRef,
    editValue,
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
  } = useHooks();

  return (
    <div css={styles.container}>
      <h1 css={styles.title}>TODOリスト</h1>
      <SelectBox selectMenu="todo" />
      <form>
        <Input placeholder="New Todo" value={value} onChange={handleChange} ref={inputRef} />
        <button
          type="button"
          css={[styles.button, styles.register]}
          onClick={() => handleClick(value)}>
          登録
        </button>
      </form>
      <div css={styles.body}>
        {list.length > 0 && (
          <div css={styles.listWrapper}>
            <ul css={[styles.list, styles.listBorder]}>
              <li css={[styles.item, styles.itemHeader]}>TODO</li>
              <li css={[styles.item, styles.itemHeader]}>登録日</li>
              <li css={[styles.action, styles.itemHeader]}>アクション</li>
            </ul>
            <ul css={styles.listItem}>
              {list.map((item) => (
                <li css={styles.list} key={item.id}>
                  <div css={[styles.text, styles.item]}>{item.value}</div>
                  <div css={[styles.text, styles.item]}>{item.time}</div>
                  <div css={styles.buttonWrapper}>
                    <button
                      type="button"
                      css={[styles.button, styles.delete]}
                      onClick={() => handleDelete(item.id)}>
                      削除
                    </button>
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
        )}
        {completeList.length > 0 && (
          <div css={styles.listWrapper}>
            <ul css={[styles.list, styles.listBorder]}>
              <li css={[styles.item, styles.itemHeader]}>完了したTODO</li>
              <li css={[styles.item, styles.itemHeader]}>完了日</li>
              <li css={[styles.action, styles.itemHeader]}>アクション</li>
            </ul>
            <ul css={styles.listItem}>
              {completeList.map((item) => (
                <li css={styles.list} key={item.id}>
                  <div css={[styles.text, styles.item]}>{item.value}</div>
                  <div css={[styles.text, styles.item]}>{item.time}</div>
                  <div css={styles.buttonWrapper}>
                    <button
                      type="button"
                      css={[styles.button, styles.edit]}
                      onClick={() => handleReset(item)}>
                      戻す
                    </button>
                    <button
                      type="button"
                      css={[styles.button, styles.delete]}
                      onClick={() => handleCompleteDelete(item.id)}>
                      削除
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isOpen && (
        <div css={styles.editBox}>
          <form>
            <Input
              placeholder="Edit Todo"
              value={editValue}
              onChange={handleEditChange}
              ref={editInputRef}
            />
            <button
              type="button"
              css={[styles.button, styles.register]}
              onClick={() => handleEdit(edit)}>
              登録
            </button>
          </form>
          <button type="button" onClick={handleClose}>
            閉じる
          </button>
        </div>
      )}
    </div>
  );
};
