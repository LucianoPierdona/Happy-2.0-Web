import styled from "styled-components";

export const BannerRight = styled.div`
  background: #fff;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  text-align: left;
  & h2 {
    color: #5c8599;
    margin: 0px;
    font-size: 32px;
    line-height: 34px;
    margin-bottom: 10px;
  }
  & p {
    color: #5c8599;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 25px;
  }
  & form {
    flex-direction: column;
    width: 70%;
    & label {
      color: #8fa7b2;
      font-family: Nunito;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
    }
    & input {
      width: 100%;
      height: 64px;
      color: #5c8599;
      border: 1px solid #d3e2e5;
      border-radius: 20px;
      outline: none;
      padding: 0 5px;
      font-size: 16px;
      text-align: center;
      margin: 3px 0 6px 0;
      &[type="password"] {
        margin-bottom: 10px;
      }
      &:focus {
        border: 1px solid #37c77f;
      }
    }
    & h1 {
      color: #5c8599;
      font-size: 32px;
      line-height: 34px;
      margin: 0 0 50px 0;
    }
    & .subtitles {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      & div {
        width: 100%;
        text-align: left;
        flex-direction: row;
      }
      & [type="checkbox"] {
        width: 15%;
        height: 15px;
      }
      & a {
        width: 100%;
        text-align: right;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        text-decoration: none;
        color: #8fa7b3;
      }
    }
    & .error {
      margin: 10px 0 2px 0;
      color: #ff000d;
      width: 100%;
      font-size: 15px;
      text-align: center;
    }
    & button {
      margin-top: 15px;
      width: 100%;
      background: #37c77f;
      color: #fff;
      border: 0;
      border-radius: 20px;
      height: 64px;
      font-size: 16px;
      line-height: 21.82px;
      cursor: pointer;
      outline: none;
      transition: opacity 0.2s;
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
      &:hover {
        opacity: 0.9;
      }
    }
  }
`;
