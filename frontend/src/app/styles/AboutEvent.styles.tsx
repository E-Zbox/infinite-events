import styled from "styled-components";

interface IBanner {
  $bgImg: string;
}

export const MainAboutEvent = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: scroll;
`;

export const Banner = styled.div<IBanner>`
  height: 60vh;
  width: 100%;
  background-image: url(${({ $bgImg }) => $bgImg});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const EventName = styled.h4`
  font-size: 1.54rem;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 2.2rem;
  margin: calc(var(--ten-px) * 2) 0px;
`;

export const EventDescription = styled.h4`
  font-size: 1rem;
  font-weight: 200;
  letter-spacing: 1px;
`;

export const EventCategory = styled.div`
  ${({ theme: { blue01 } }) => `
  font-family: Source Sans Pro;
  font-size: 1.05rem;
  border: 1px solid ${blue01};
  border-radius: 30px;
  cursor: pointer;
  transition: 450ms ease-out;
  margin: 0px calc(var(--seven-px) * 1.4);
  padding: calc(var(--seven-px)) calc(var(--ten-px) * 1.6);
  color: ${blue01};
  background-color: ${"transparent"};

  &:hover {
    background-color: ${blue01}bc;
  }

  &:active {
    scale: 0.95;
  }
  `}
`;

export const JoinButton = styled.button`
  ${({ theme: { blue01, purple01 } }) => `
    color: ${blue01};
    background-color: ${purple01};
    font-size: 1.1rem;
    outline: none;
    border: none;
    border-radius: 4px;
    padding: calc(var(--three-px) * 2) calc(var(--seven-px) * 2);

    &:disabled {
        opacity: 0.65
    }
    `}
`;

export const EventSection = styled.h4`
  font-size: 1.24rem;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 2rem;
  margin: calc(var(--three-px) * 2) 0px;
`;
