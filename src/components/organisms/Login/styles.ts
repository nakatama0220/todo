import { css } from '@emotion/react';

export const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    background-color: #778899;
    min-height: 100vh;
  `,
  labelWrapper: css`
    display: flex;
    gap: 10px;
    flex-direction: column;
  `,
  input: css`
    border: 1px solid #fff;
    border-radius: 3px;
    padding: 5px;
  `,
  label: css`
    color: #fff;
  `,
  button: css`
    background-color: #90ee90;
    padding: 10px;
  `,
};
