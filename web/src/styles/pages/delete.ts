import styled from "styled-components";

export const DeleteBlock = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ff669d;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & .delete-content {
    margin-right: 55px;
    text-align: center;
    & h1 {
      font-size: 80px;
      line-height: 80px;
    }
    & p {
      font-size: 24px;
      line-height: 34px;
      width: 70%;
      margin: 15px auto 25px auto;
    }
    & .delete-buttons {
      flex-direction: row;
      justify-content: space-between;
      width: 50%;
      margin: 0 auto;
      & a,
      button {
        padding: 15px 35px;
        border-radius: 20px;
        color: #ffffff;
        text-decoration: none;
        font-weight: 800;
        font-size: 18px;
        line-height: 25px;
        transition: background-color 0.2s;
        border: 0;
        cursor: pointer;
      }
      & a {
        background: #d6487b;
        &:hover {
          background: #b62c5f;
        }
      }
      & button {
        background: #b62c5f;
        &:hover {
          background: #d6487b;
        }
      }
    }
  }
`;
