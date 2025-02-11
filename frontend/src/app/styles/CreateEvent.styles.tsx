import styled from "styled-components";

interface IMainCreateEvent {
  $marginTop: string;
}

interface IInputContainer {
  $border?: boolean;
}

interface ISelected {
  $selected: boolean;
}

export const MainCreateEvent = styled.main<IMainCreateEvent>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: ${({ $marginTop }) => $marginTop};
  overflow: scroll;
`;

export const CreateEventTitle = styled.h2`
  font-size: 1.2rem;
  margin-top: calc(var(--ten-px) * 2);
`;

export const EventCategoryScroller = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  overflow-x: scroll;
`;

export const EventCategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
  width: fit-content;
  min-width: 100%;
`;

export const EventCategory = styled.div<ISelected>`
  ${({ $selected, theme: { blue01, black04 } }) => `
  font-family: Source Sans Pro;
  font-size: 1.05rem;
  border: 1px solid ${blue01};
  border-radius: 30px;
  cursor: pointer;
  transition: 450ms ease-out;
  margin-right: calc(var(--seven-px) * 1.4);
  padding: calc(var(--seven-px)) calc(var(--ten-px) * 1.6);
  color: ${$selected ? black04 : blue01};
  background-color: ${$selected ? blue01 : "transparent"};

  &:hover {
    background-color: ${$selected ? blue01 : `${blue01}bc`};
  }

  &:active {
    scale: ${$selected ? 1 : 0.95};
  }
  `}
`;

export const EventCategoryTitle = styled.h4`
  white-space: nowrap;
`;

export const Form = styled.form`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: calc(var(--ten-px) * 2);
  margin-top: calc(var(--ten-px) * 1.2);
  box-shadow: 1px 1px 5px inset #0001;
`;

export const InputContainer = styled.div<IInputContainer>`
  position: relative;
  height: 50px;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  overflow: hidden;
  margin-top: calc(var(--three-px) * 2);
  padding: 0px calc(var(--seven-px) * 2);
  background-color: ${({ theme: { white01 } }) => `${white01}1a`};
  border: ${({ $border }) => ($border ? "2px solid red" : "")};

  &:first-of-type {
    margin-top: 0px;
  }
`;

export const InputLabel = styled.h4`
  color: ${({ theme: { white01 } }) => `${white01}8a`};
  font-family: "Source Sans Pro";
  font-size: 1.1rem;
  font-weight: 200;
  background: none;
  line-height: 2rem;
  margin-top: calc(var(--ten-px) * 3);
`;

export const TextArea = styled.textarea`
  height: 200px;
  width: 300px;
  font-size: 1rem;
  color: ${({ theme: { black04 } }) => black04};
  padding: var(--ten-px);
`;

export const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: calc(var(--ten-px) * 2) calc(var(--ten-px) * 3);
  border: none;
  margin-top: calc(var(--ten-px) * 3);
  font-size: 1.3rem;
  color: white;
  opacity: 0.85;
  scale: 0.98;
  transition: 250ms linear;
  background-color: ${({ theme: { blue02 } }) => `${blue02}cc`};

  &:hover {
    opacity: 1;
    scale: 1;
    transform: translateY(-2px);
  }

  &:active {
    scale: 0.98;
  }

  &:disabled {
    opacity: 0.4;

    &:active,
    &:hover {
      opacity: 0.4;
      scale: 0.98;
      transform: translateY(0px);
    }
  }
`;

export const Select = styled.select`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
`;
