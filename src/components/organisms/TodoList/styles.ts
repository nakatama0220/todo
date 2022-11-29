import { css } from '@emotion/react';

export const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
  `,
  body: css`
    display: flex;
    gap: 10px;
    width: 100%;
  `,
  input: css`
    padding: 5px;
    border-radius: 5px;
  `,
  header: css`
    border-bottom: 1px solid #fff;
  `,
  headerItem: css`
    display: flex;
    justify-content: center;
  `,
  headerDate: css`
    width: 115px;
  `,
  action: css`
    width: 150px;
    display: flex;
    justify-content: center;
  `,
  list: css`
    display: flex;
    gap: 10px;
    align-items: center;
  `,
  value: css`
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  buttonWrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 150px;
  `,
  button: css`
    padding: 5px;
    border-radius: 5px;
  `,
  complete: css`
    background-color: #00ffff;
  `,
  edit: css`
    background-color: #6495ed;
  `,
};
