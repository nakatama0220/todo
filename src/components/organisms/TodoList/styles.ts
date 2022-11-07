import { css } from '@emotion/react';

export const styles = {
  title: css`
    font-size: 3rem;
    color: #9acd32;
  `,
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  `,
  register: css`
    background-color: #00ffff;
  `,
  button: css`
    padding: 5px;
  `,
  listWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    background-color: #333;
    color: #fff;
    height: 100%;
  `,
  list: css`
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 1.4rem;
  `,
  listBorder: css`
    border-bottom: 1px solid #fff;
  `,
  item: css`
    display: flex;
    justify-content: center;
    width: 200px;
    word-break: break-all;
  `,
  action: css`
    flex: 1;
  `,
  delete: css`
    background-color: #ff0000;
  `,
  edit: css`
    background-color: #6495ed;
  `,
  editBox: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  listItem: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 650px;
    overflow-y: auto;
  `,
  body: css`
    display: flex;
    gap: 10px;
  `,
  buttonWrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1;
  `,
  input: css`
    padding: 5px;
    background: #d2d2d2;
  `,
  titleWrapper: css`
    display: flex;
    gap: 20px;
  `,
  topPage: css`
    background-color: #fff;
  `,
};
