import { css } from '@emotion/react';

export const reset = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  *::before,
  *::after {
    box-sizing: inherit;
  }
  html {
    padding: 0;
    margin: 0;
    font-size: 62.5%;
    word-wrap: break-word;
  }
  body,
  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  form,
  fieldset,
  input,
  textarea,
  p,
  blockquote,
  table,
  tr,
  th,
  td,
  p,
  hr,
  address {
    padding: 0;
    margin: 0;
  }
  body {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    line-height: 1.4;
    color: #333;
    letter-spacing: 0.02em;
    background-color: #fff;
  }
  input {
    border: none;
    &:-webkit-autofill {
      transition: background-color 10000s ease-in-out 0s;
    }
  }
  input,
  textarea {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }
  input:focus,
  textarea:focus {
    outline: none;
  }
  * html body {
    font-size: 100%;
  }
  *:first-of-type + html body {
    font-size: 100%;
  }
  table {
    font-size: inherit;
    border-spacing: 0;
    border-collapse: collapse;
  }
  fieldset,
  img {
    border: 0ch;
  }
  img {
    max-width: 100%;
    vertical-align: middle;
  }
  address,
  caption,
  cite,
  code,
  dfn,
  th,
  var,
  strong {
    font-style: normal;
    font-weight: normal;
  }
  ol,
  ul,
  li {
    list-style: none outside none;
  }
  caption,
  th {
    text-align: left;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }
  q:before,
  q:after {
    content: '';
  }
  abbr,
  acronym {
    border: 0;
  }
  a {
    text-decoration: none;
  }
  a:focus:not(:focus-visible) {
    outline: none;
  }
  button {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    border: none;
    appearance: none;
  }
`;
