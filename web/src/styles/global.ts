import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: #fff;
    background: #ebf2f5;
  }

  body,
  input,
  button,
  textarea {
    font: 600 10px "Nunito", sans-serif;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  button {
    outline: none;
  }
`;

export default Global;
