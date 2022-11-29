import { css } from '@emotion/react';

export const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
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
};
