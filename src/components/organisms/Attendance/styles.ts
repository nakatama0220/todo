import { css } from '@emotion/react';

export const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  `,
  header: css`
    display: flex;
    border-bottom: 1px solid #333;
  `,
  body: css`
    background-color: #b0e0e6;
    border-radius: 5px;
    padding: 15px;
    min-width: 950px;
  `,
  item: css`
    width: 23%;
    display: flex;
    justify-content: center;
  `,
  list: css`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 5px;
    max-height: 370px;
    overflow-y: auto;
  `,
  listItem: css`
    display: flex;
    align-items: center;
  `,
};
