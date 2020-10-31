import styled from "styled-components";

export const MapCard = styled.div`
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
      & .accepted {
        justify-content: space-between;
      }
      & .pendents {
        justify-content: center;
      }
      & button,
      a {
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
