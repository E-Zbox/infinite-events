"use client";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
// store
import { useDefaultStore } from "@/store";
// styles
import { MainNav, NavButton, NavLogo, NavTitle } from "../styles/Navbar.styles";
// utils
import { screens } from "../utils/data";
import { DivContainer } from "../styles/shared/Container.styles";

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const Navbar = () => {
  const {
    navbar: {
      assets: { navbarLogo },
    },
  } = screens;

  const { navbarHeightState, setNavbarHeightState, userState, setUserState } =
    useDefaultStore();

  const navbarRef = useRef<HTMLElement>(null);

  const { isGuest, signedIn, username } = userState;

  const handleClick = () => {
    const socket = io(`${SOCKET_URL}/socket/user`, {
      extraHeaders: {
        Authorization: `Bearer `,
      },
    });

    setUserState({
      isGuest: false,
      signedIn: false,
      socket,
      token: "",
      username: "",
    });
  };

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeightState(`${navbarRef.current.clientHeight}px`);
    }
  }, [navbarRef.current]);

  if (!isGuest && !signedIn) {
    return <></>;
  }

  return (
    <MainNav ref={navbarRef}>
      <DivContainer $flexDirection="row" $width="fit-content">
        <DivContainer
          $alignItems="flex-start"
          $flexDirection="column"
          $width="fit-content"
        >
          <NavTitle>Infinite</NavTitle>
          <NavTitle>Events</NavTitle>
        </DivContainer>
        <NavLogo src={navbarLogo.src} alt="navbar-logo" />
      </DivContainer>
      <DivContainer $flexDirection="row" $height="100%" $width="fit-content">
        <h2>Welcome, {username}</h2>
        <NavButton onClick={handleClick}>
          {isGuest ? "Sign-Up" : "Logout"}
        </NavButton>
      </DivContainer>
    </MainNav>
  );
};

export default Navbar;
