"use client";
import React, { Ref, useEffect, useRef, useState } from "react";
// styles
import {
  Carousel,
  CarouselScroller as Scroller,
  MainCarouselScroller,
  CarouselText,
  CarouselButton,
} from "@/app/styles/AuthenticationScreen/CarouselScroller.styles";
import {
  DivContainer,
  PositionContainer,
} from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/app/utils/data";

const CarouselScroller = () => {
  const {
    authentication: { carouselArray },
  } = screens;

  const scrollerRef = useRef<HTMLElement>(null);
  const [currentCarouselIdState, setCurrentCarouselIdState] = useState(0);

  useEffect(() => {
    if (scrollerRef.current) {
      const intervalId = setInterval(() => {
        setCurrentCarouselIdState((prevState) => {
          if (prevState >= carouselArray.length - 1) {
            return 0;
          }
          return prevState + 1;
        });
      }, 5000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [scrollerRef.current]);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({
        behavior: "smooth",
        left: currentCarouselIdState * scrollerRef.current.clientWidth,
      });
      console.log({
        scrollLeft: scrollerRef.current.scrollLeft,
        scrollWidth: scrollerRef.current.scrollWidth,
        currentCarouselIdState,
      });
    }
  }, [currentCarouselIdState]);

  return (
    <MainCarouselScroller>
      <Scroller ref={scrollerRef}>
        <DivContainer
          $flexDirection="row"
          $alignItems="flex-start"
          $height="100%"
          $width="fit-content"
        >
          {carouselArray.map(({ image, text }, index) => (
            <Carousel
              key={index}
              $bgImg={image}
              $width={`${
                scrollerRef.current ? scrollerRef.current.clientWidth : 0
              }px`}
            >
              <CarouselText>{text}</CarouselText>
            </Carousel>
          ))}
        </DivContainer>
      </Scroller>
      <PositionContainer
        $left="50%"
        $top={"100%"}
        $flexDirection="row"
        $justifyContent="center"
        $width="100%"
        $miscellanous="transform: translate(-50%, -30px);"
      >
        {carouselArray.map((_, index) => (
          <CarouselButton
            key={index}
            $selected={index == currentCarouselIdState}
          ></CarouselButton>
        ))}
      </PositionContainer>
    </MainCarouselScroller>
  );
};

export default CarouselScroller;
