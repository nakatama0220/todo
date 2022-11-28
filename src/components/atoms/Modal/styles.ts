import { css } from '@emotion/react';

export const styles = {
  overlay: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  root: css`
    z-index: 100;
    width: 50%;
    background-color: #c0c0c0;
  `,
};
