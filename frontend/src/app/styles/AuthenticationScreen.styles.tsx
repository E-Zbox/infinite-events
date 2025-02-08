import styled from "styled-components";

interface IInputContainer {
  $border?: boolean;
}

export const MainAuthScreen = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  & > main {
    height: 100%;
    width: 49%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
  }
`;

export const MainImageScroller = styled.main`
  border: 1px solid red;
`;

export const MainForm = styled.main`
  align-items: center;
  padding: calc(var(--ten-px) * 3);
  padding-bottom: 0px;
`;

export const FormTitle = styled.h2`
  color: ${({ theme: { white01 } }) => white01};
  color: #fff;
  font-family: Inter;
  font-size: 3rem;
  font-weight: 400;
`;

export const SubTitle = styled.h4`
  color: ${({ theme: { white01 } }) => `${white01}cc`};
  font-size: 1.1rem;
  font-weight: 200;
  width: fit-content;
`;

export const FormLink = styled.h4`
  color: ${({ theme: { blue01 } }) => blue01};
  font-size: 1.1rem;
  font-weight: 200;
  padding-left: var(--seven-px);
  text-decoration: underline;
  opacity: 0.85;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &:active {
    scale: 0.9;
  }
`;

export const Form = styled.form`
  height: 400px;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: calc(var(--ten-px) * 2);
  margin-top: calc(var(--ten-px) * 4);
  box-shadow: 1px 1px 5px inset #0001;
`;

export const InputContainer = styled.div<IInputContainer>`
  position: relative;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  overflow: hidden;
  margin-top: calc(var(--seven-px) * 2);
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
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
`;

export const InputError = styled.h4`
  color: #ff3234aa;
  font-size: 0.9rem;
  font-weight: 200;
  line-height: 2rem;
`;

export const TextInput = styled.input`
  background-color: transparent;
  outline: none;
  height: 100%;
  width: 100%;
  border: 0px;
  font-size: 1.1rem;
  padding: calc(var(--seven-px) * 2) 0px;
`;

export const PasswordViewButton = styled.img`
  --size: 24px;
  outline: none;
  height: var(--size);
  width: var(--size);
  opacity: 0.8;
  scale: 0.9;
  transition: 250ms ease-in-out;

  &:hover {
    opacity: 1;
    scale: 1;
  }

  &:active {
    scale: 0.95;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: calc(var(--ten-px) * 2) 0px;
  border: none;
  margin-top: calc(var(--ten-px) * 3);
  font-size: 1.3rem;
  color: white;
  opacity: 0.85;
  scale: 0.98;
  transition: 250ms linear;
  background-color: ${({ theme: { purple02 } }) => purple02};

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
