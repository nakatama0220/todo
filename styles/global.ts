import { css } from '@emotion/react';

export const global = css`
  body {
    overflow-y: hidden;
    font-family: Roboto, 'Noto Sans JP', sans-serif;
    font-weight: normal;
    background-color: #f7f6f5;
  }
  input::placeholder {
    font-family: Roboto, 'Noto Sans JP', sans-serif;
    color: #b7b7b7;
  }
  input:focus,
  textarea:focus {
    border-color: #84add6;
  }
  [tabindex='-1'] {
    outline: none;
  }
`;
