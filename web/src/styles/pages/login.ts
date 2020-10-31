import styled from "styled-components";

export const LoginPage = styled.div`
  flex-direction: row;
  & .go-back {
    position: absolute;
    width: 48px;
    height: 48px;
    right: 55px;
    top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ebf2f5;
    border-radius: 16px;
    transition: background-color 0.2s;
    &:hover {
      background: #5c8599;
    }
  }
`;
