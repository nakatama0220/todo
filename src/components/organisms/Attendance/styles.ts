import { css } from '@emotion/react';

export const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  `,
  title: css`
    font-size: 3rem;
    color: #9acd32;
  `,
  wrapper: css`
    display: flex;
    gap: 20px;
  `,
  header: css`
    display: flex;
  `,
  body: css`
    background-color: #b0e0e6;
    border-radius: 5px;
    padding: 15px;
  `,
  item: css`
    width: 220px;
    display: flex;
    justify-content: center;
  `,
  list: css`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  listItem: css`
    display: flex;
    align-items: center;
  `,
  deleteButton: css`
    background-color: #ff0000;
    padding: 5px;
    border-radius: 5px;
  `,
  button: css`
    padding: 5px;
    color: red;
    background-color: white;
  `,
};
