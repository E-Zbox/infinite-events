import styled from "styled-components";

export const MainNav = styled.main`
  position: sticky;
  top: 0px;
  left: 0px;
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background
  box-shadow: 0px 0px 1px 2px #ddd1;
  background-color: ${({ theme: { black05 } }) => black05};
  padding: 0px calc(var(--ten-px) * 4) 0px calc(var(--ten-px) * 3);
`;

export const NavLogo = styled.img`
  --size: 50px;
  height: var(--size);
  width: var(--size);
  margin-left: var(--seven-px);
`;

export const NavTitle = styled.h1`
  font-family: "Darumadrop One";
  font-size: 1.34rem;
  font-weight: bold;
  line-height: 1rem;
  text-transform: uppercase;
`;

export const NavButton = styled.button`
  ${({ theme: { purple02, white01 } }) => `
        color: ${white01};
        height: 100%;
        border: none;
        outline: none;
        font-size: 1.1rem;
        background: none;
        padding: 0px var(--ten-px);
        margin-left: calc(var(--ten-px) * 2);
        transition: 250ms ease-out;

        &:hover {
          color: ${purple02};
          background-color: ${white01};
          border-bottom: 3px solid ${purple02};
          border-radius: 3px;
        }

        &:active {
          scale: 0.98;
        }
    `}
`;
