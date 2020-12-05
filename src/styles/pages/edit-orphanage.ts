import styled from "styled-components";

export const EditOrphanagePage = styled.div`
  width: calc(100% - 97px);
  margin-left: 97px;
  & .edit-header {
    width: 100%;
    text-align: center;
    margin: 20px 0;
    & h1 {
      font-size: 18px;
      line-height: 28px;
      font-weight: 600;
      color: #8fa7b3;
    }
  }
  & .edit-subtitle {
    width: 700px;
    margin: 64px auto 0 auto;
    & h1 {
      font-size: 32px;
      line-height: 34px;
      color: #4d6f80;
    }
    & hr {
      border: 1px solid #d3e2e5;
      background: #d3e2e5;
    }
  }
`;
