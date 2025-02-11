import styled from "styled-components";

interface ICarousel {
  $bgImg: string;
  $width: string;
}

interface ICarouselButton {
  $selected: boolean;
}

export const MainCarouselScroller = styled.main`
  position: relative;
  overflow: hidden;
`;

export const CarouselScroller = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const Carousel = styled.div<ICarousel>`
  ${({ $bgImg, $width, theme: { black04, blue01 } }) => `
    height: 100%;
    width: ${$width};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    background: linear-gradient(to top, ${black04}f5, ${black04}95, ${blue01}03), url(${$bgImg});
    background-position: left top;
    background-repeat: no-repeat;
    background-size: cover;
    padding-bottom: calc(var(--ten-px) * 2);
    `}
`;

export const CarouselText = styled.h4`
  color: ${({ theme: { white01 } }) => white01};
  font-family: Source Sans Pro;
  font-size: 1.31rem;
  font-style: italic;
  padding: calc(var(--ten-px) * 2.5);
`;

export const CarouselButton = styled.button<ICarouselButton>`
  height: 7px;
  width: 50px;
  border-radius: 30px;
  border: none;
  outline: none;
  margin: 0px calc(var(--three-px));

  ${({ $selected, theme: { white01, blue01 } }) =>
    $selected
      ? `
    scale: 1;
    border: 0px solid transparent;
    background-color: ${blue01};
  `
      : `
    scale: 0.8;
    background-color: #fff5;
  `}
`;
