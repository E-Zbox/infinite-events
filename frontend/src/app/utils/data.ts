import checkmarkLogo from "../../../public/icons8-check-48.png";
import hidePasswordLogo from "../../../public/icons8-hide-password-50.png";
import loaderLogo from "../../../public/loader.gif";
import showPasswordLogo from "../../../public/icons8-show-password-30.png";

export const theme = {
  black01: "#4c4c5c",
  black02: "#2c2c44",
  black03: "#140c2c",
  black04: "#0a051f",
  blue01: "#848cda",
  blue02: "#4116d3",
  blue03: "#170d7d",
  purple01: "#cf28e5",
  purple02: "#712081",
  purple03: "#3b2352",
  white01: "#c3c0cd",
};

export const devices = {};

export const screens = {
  default: {
    assets: {
      loaderLogo,
    },
  },
  authentication: {
    assets: {
      checkmarkLogo,
      hidePasswordLogo,
      showPasswordLogo,
    },
  },
};
