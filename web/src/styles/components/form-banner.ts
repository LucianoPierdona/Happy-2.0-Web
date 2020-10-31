import styled from "styled-components";

export const BannerLeft = styled.div`
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
  width: 70%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & img {
    margin-bottom: 60px;
  }
  & .location {
    flex-direction: column;
    text-align: center;
    & p {
      font-size: 24px;
      line-height: 34px;
    }
    & strong {
      font-size: 24px;
      line-height: 30px;
      font-weight: 800;
      font-family: Nunito;
    }
  }
`;
