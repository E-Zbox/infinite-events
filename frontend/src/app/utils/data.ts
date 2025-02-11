import loaderLogo from "../../../public/loader.gif";
// screens
import authentication from "./authentication";
import navbar from "./navbar";

export const theme = {
  black01: "#4c4c5c",
  black02: "#2c2c44",
  black03: "#140c2c",
  black04: "#0a051f",
  black05: "#110d29",
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
  authentication,
  navbar,
};
