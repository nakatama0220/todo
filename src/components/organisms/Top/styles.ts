import { css } from '@emotion/react';

export const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
  title: css`
    font-size: 3rem;
    color: #9acd32;
  `,
  wrapper: css`
    display: flex;
    gap: 20px;
  `,
  button: css`
    color: red;
    background-color: white;
  `,
  buttonWrapper: css`
    display: flex;
    gap: 15px;
  `,
  attendanceButton: css`
    padding: 5px;
    border-radius: 5px;
  `,
  able: css`
    background-color: #7fff00;
  `,
  disabled: css`
    background-color: #808080;
  `,
};
