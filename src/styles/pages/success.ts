import styled from "styled-components";

export const SuccessPageBlock = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #37c77f;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  & .content-block {
    text-align: center;
    width: 34%;
    margin-right: 35px;
    & h1 {
      font-size: 80px;
      line-height: 80px;
      margin-bottom: 15px;
    }
    & p {
      font-size: 24px;
      line-height: 34px;
      margin-bottom: 30px;
    }
    & a {
      width: 50%;
      margin: 0 auto;
      padding: 20px 20px;
      background: #31b272;
      border-radius: 20px;
      text-decoration: none;
      font-weight: 800;
      font-size: 18px;
      line-height: 25px;
      color: #fff;
      transition: background-color 0.2s;
      &:hover {
        background: #3bd689;
      }
    }
  }
`;
