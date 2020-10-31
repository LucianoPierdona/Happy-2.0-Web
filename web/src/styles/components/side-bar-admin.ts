import styled from "styled-components";

export const SideBarAdminAside = styled.aside`
  position: fixed;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & .button-side-bar {
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
    &:hover {
      background: #0e9ab3;
    }
    &.first {
      margin-bottom: 15px;
    }
    &.active {
      background: #ffd666;
      transition: background-color 0.2s;
      &:hover {
        background: #fbff00;
      }
    }
    &.not-active {
      background: #12afcb;
    }
  }
  & img {
    width: 48px;
  }
  & footer a,
  footer button {
    width: 48px;
    height: 48px;
    border: 0;
    background: #12afcb;
    border-radius: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: #17d6eb;
    }
  }
`;
