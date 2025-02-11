import styled from "styled-components";

interface IMainHomeScreen {
  $marginTop: string;
}

interface ISelected {
  $selected: boolean;
}

interface IEventCard {
  $bgImg: string;
}

export const MainHomeScreen = styled.main<IMainHomeScreen>`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: scroll;
  margin-top: ${({ $marginTop }) => $marginTop};
`;

export const HomeScreenContainer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const SectionTitle = styled.div`
  color: ${({ theme: { black01 } }) => `${black01}88`};
  font-family: sans-serif;
  font-size: 1.02rem;
  font-weight: bold;
  line-height: 2.5rem;
  text-transform: uppercase;
`;

export const MainCategory = styled.main`
  position: relative;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  padding: calc(var(--three-px) * 2);
  padding-left: 20px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    right: 0px;
    top: 50%;
    height: 100%;
    width: 40px;
    transform: translateY(-50%);
    background: ${({ theme: { black04 } }) =>
      `linear-gradient(to right, ${black04}00, ${black04}83)`};
  }

  &::after {
    left: 0px;
    background: ${({ theme: { black04 } }) =>
      `linear-gradient(to right, ${black04}83, ${black04}00)`};
  }
`;

export const CategoryScroller = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  overflow-x: scroll;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
  width: fit-content;
  min-width: 100%;
`;

export const Category = styled.div<ISelected>`
  --color: ${({ theme: { purple01 } }) => purple01};
  font-family: Source Sans Pro;
  font-size: 1.05rem;
  border: 1px solid var(--color);
  border-radius: 30px;
  cursor: pointer;
  transition: 450ms ease-out;
  margin-right: calc(var(--seven-px) * 1.4);
  padding: calc(var(--seven-px)) calc(var(--ten-px) * 1.6);

  ${({ $selected, theme: { black02, purple01 } }) =>
    $selected
      ? `
      --color: ${black02};
      background-color: ${purple01};
      scale: 1;
      `
      : `
      color: var(--color);
      scale: 0.95;

    &:hover {
        --color: ${black02};
        background-color: ${purple01};
        scale: 1;
    }
    
    &:active {
        scale: 0.98;
    }
    `}
`;

export const CategoryTitle = styled.h4`
  white-space: nowrap;
`;

export const FilterButton = styled.h4<ISelected>`
  color: ${({ theme: { white01 } }) => white01};
  background: ${({ theme: { blue01 } }) => `${blue01}22`};
  transition: 350ms ease-out;
  border-radius: 20px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0px 0px 3px 1px ${({ theme: { black01 } }) => `${black01}13`};
  border: 1px solid ${({ theme: { blue01 } }) => blue01};
  padding: calc(var(--three-px) * 3) calc(var(--seven-px) * 2.4);
  ${({ $selected, theme: { blue03, blue01 } }) =>
    $selected
      ? `
    opacity: 1;
    scale: 1;
    background: radial-gradient(ellipse at bottom left, ${blue03}fb, ${blue01}34);
  `
      : `
    opacity: 0.47;
    scale: 0.95;

    &:hover {
        opacity: 1;
        scale: 1;
        transform: translateY(-2px);
    }

    &:active {
        scale: 0.95;
    }
  `}

  &:first-of-type {
    margin-right: var(--ten-px);
  }
`;

export const MainEvents = styled.main`
  height: fit-content;
  max-height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: scroll;
  padding: var(--ten-px) calc(var(--ten-px) * 2);
  margin-top: calc(var(--ten-px) * 2);
`;

export const EventsContainer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const EventCard = styled.div<IEventCard>`
  --size: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: var(--size);
  width: var(--size);
  border: 1px solid #ddd4;
  border-radius: 8px;
  background-image: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  scale: 1;
  overflow: hidden;
  transition: 250ms linear;
  margin: var(--ten-px) calc(var(--ten-px) * 1.5);

  &:hover {
    scale: 1.05;
  }

  &:active {
    scale: 1;
  }
`;

export const EventName = styled.h4`
  color: ${({ theme: { blue01 } }) => blue01};
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  padding: var(--ten-px);
  background-color: #0009;
  box-shadow: 0px -2px 3px #9992;
`;

export const AddEventButton = styled.div`
  ${({ theme: { blue01, black04 } }) => `
        --size: 150px;
        height: var(--size);
        width: var(--size);
        color: ${blue01};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-self: center;
        border-radius: 5px;
        cursor: pointer;
        border: 1px dashed ${blue01};
        transition: 250ms ease-in;

        &:hover {
            color: ${black04};
            background-color: ${blue01}ac;
            border: 0px dashed transparent;
        }

        &:active {
          scale: 0.9;
        }
    `}
`;
