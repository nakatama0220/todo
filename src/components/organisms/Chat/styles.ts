import { css } from '@emotion/react';

export const styles = {
  root: css`
    padding: 50px;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  input: css`
    width: 400px;
    padding: 10px;
  `,
  button: css`
    padding: 10px;
    background-color: red;
  `,
  list: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
    padding: 20px;
    border: 1px solid #333;
  `,
  active: css`
    background-color: blue;
  `,
  stop: css`
    background-color: green;
  `,
};
