import styled from "styled-components";

export const ListContent = styled.div`
  width: calc(100% - 96px);
  height: 100vh;
  margin-left: 96px;
  background-color: #f1f1f1;
  & hr {
    width: 90%;
    margin: 0 auto;
    border: 1px solid #d3e2e5;
    margin-bottom: 15px;
  }
  & .list-header {
    width: 90%;
    margin: 20px auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & h1 {
      font-weight: bold;
      font-size: 32px;
      line-height: 34px;
      color: #4d6f80;
    }
    & p {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #8fa7b3;
    }
  }
  & .list-orphanages {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 2fr;
    gap: 4rem 1rem;
    & .map-card {
      width: 100%;
      border-radius: 20px;
      background: #fff;
      border: 1px solid #d3e2e5;
      & .leaflet-container {
        border-radius: 20px;
      }
      & .footer-card {
        background: #fff;
        padding: 10px 12px;
        border-radius: 0 0 20px 20px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #4d6f80;
        & .card-buttons {
          margin-right: 20px;
          width: 19%;
          flex-direction: row;
          justify-content: space-between;
          & a,
          button {
            background: #ebf2f5;
            align-items: center;
            border-radius: 16px;
            border: 0;
            padding: 5px 10px;
            cursor: pointer;
            transition: background-color 0.2s;
            &:hover {
              background: #d3e2e5;
            }
          }
        }
      }
    }
  }
  & .no-content {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    & img {
      height: 120px;
      margin-bottom: 15px;
    }
    & p {
      font-weight: 600;
      font-size: 24px;
      line-height: 34px;
      color: #8fa7b3;
    }
  }
`;
