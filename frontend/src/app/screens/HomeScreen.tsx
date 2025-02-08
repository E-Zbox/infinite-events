"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
// api
import {
  getCategories,
  getEventsByCategoryId,
  getEventsByCategoryIdAndTimeline,
} from "@/api/graphql";
// socket
import { emitEvents, IEventRoom, onEvents } from "@/api/socket";
// store
import { ICategoryState, useDefaultStore, useEventPageStore } from "@/store";
// styles
import {
  Category,
  CategoryContainer,
  CategoryScroller,
  CategoryTitle,
  SectionTitle,
  MainCategory,
  MainHomeScreen,
  FilterButton,
  MainEvents,
  EventsContainer,
  EventCard,
  EventName,
  HomeScreenContainer,
  AddEventButton,
} from "../styles/HomeScreen.styles";
import { StatusImage } from "../styles/shared/Image.styles";
// utils
import { screens } from "../utils/data";
import { DivContainer } from "../styles/shared/Container.styles";

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const HomeScreen = () => {
  const {
    default: {
      assets: { loaderLogo },
    },
  } = screens;

  const {
    categoryState,
    setCategoryState,
    selectCategoryState,
    selectedCategoryIdState,
    eventState,
    setEventState,
    setSelectedCategoryIdState,
    socketState,
    setSocketState,
    userState,
  } = useDefaultStore();

  const { setCategoryState: setEventPageCategoryState } = useEventPageStore();

  const router = useRouter();

  const [timelineFilterState, setTimelineFilterState] = useState([
    {
      name: "PAST EVENTS",
      selected: false,
      value: "PAST",
    },
    {
      name: "UPCOMING EVENTS",
      selected: false,
      value: "UPCOMING",
    },
  ]);

  const [loadingState, setLoadingState] = useState(false);

  const { token, username } = userState;

  const categoriesIds = Object.getOwnPropertyNames(categoryState);

  const handleFilterButtonClick = (index: number) => {
    setTimelineFilterState(
      timelineFilterState.map((filter, id) => {
        if (id === index) {
          return {
            ...filter,
            selected: !filter.selected,
          };
        }

        return { ...filter, selected: false };
      })
    );
  };

  const {
    connection_success,
    event_room_error,
    event_room_success,
    join_event_rooms_success,
  } = emitEvents;

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        namespace: "/socket/user",
      },
    });

    socket.on("connected", () => {
      console.log("connected here");
    });

    socket.on(connection_success, (payload: IGenericResponse<string>) => {
      console.log("connected to namespace");
      console.log(payload);
    });

    socket.on(
      join_event_rooms_success,
      (payload: IGenericResponse<IEventRoom>) => {
        console.log(payload);
      }
    );

    setSocketState(socket);

    setLoadingState(true);

    getCategories(token)
      .then((res) => {
        const { data, error, success } = res;

        if (success) {
          const newCategoryState: ICategoryState = {};

          data?.map(({ _id, createdAt, name, updatedAt }) => {
            newCategoryState[_id] = {
              _id,
              name,
              selected: false,
              createdAt,
              updatedAt,
            };
          });

          setCategoryState(newCategoryState);
          setEventPageCategoryState(newCategoryState);
        } else {
          window.alert(error);
        }

        setLoadingState(false);
      })
      .catch((err) => {
        // console.log(err);

        setLoadingState(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategoryIdState) {
      selectCategoryState(selectedCategoryIdState);

      setLoadingState(true);

      getEventsByCategoryId(token, selectedCategoryIdState)
        .then((res) => {
          const { data, error, success } = res;

          if (success) {
            setEventState({ [selectedCategoryIdState]: data! });
          } else {
            window.alert(error);
          }

          setLoadingState(false);
        })
        .catch((err) => {
          // console.log(err);

          setLoadingState(false);
        });
    }
  }, [selectedCategoryIdState]);

  useEffect(() => {
    if (socketState) {
      socketState.on(
        connection_success,
        (payload: IGenericResponse<string>) => {
          console.log("connected to namespace");
          console.log(payload);
        }
      );

      socketState.on(
        join_event_rooms_success,
        (payload: IGenericResponse<IEventRoom>) => {
          console.log(payload);
        }
      );
    }
  }, [socketState]);

  useEffect(() => {
    const selectedFilter = timelineFilterState.find(
      (filter) => filter.selected == true
    );

    if (selectedFilter) {
      const { value } = selectedFilter;

      setLoadingState(true);

      getEventsByCategoryIdAndTimeline(token, selectedCategoryIdState, value)
        .then((res) => {
          const { data, error, success } = res;

          if (success) {
            setEventState({ [selectedCategoryIdState || value]: data! });
          } else {
            window.alert(error);
          }

          setLoadingState(false);
        })
        .catch((err) => {
          // console.log(err);

          setLoadingState(false);
        });
    }
  }, [timelineFilterState]);

  return (
    <MainHomeScreen>
      <HomeScreenContainer>
        <h2>Welcome, {username}</h2>
        <SectionTitle>CATEGORIES</SectionTitle>
        <MainCategory>
          <CategoryScroller>
            <CategoryContainer>
              {loadingState && categoriesIds.length == 0 ? (
                <StatusImage src={loaderLogo.src} alt="loader" $size={"50px"} />
              ) : (
                categoriesIds.map((_id) => {
                  const { name, selected } = categoryState[_id];

                  return (
                    <Category
                      key={_id}
                      $selected={selected}
                      onClick={() => setSelectedCategoryIdState(_id)}
                    >
                      <CategoryTitle>{name}</CategoryTitle>
                    </Category>
                  );
                })
              )}
            </CategoryContainer>
          </CategoryScroller>
        </MainCategory>
        <SectionTitle>Filter By</SectionTitle>
        <DivContainer $flexDirection="row" $width={"100%"}>
          {timelineFilterState.map(({ name, selected }, index) => (
            <FilterButton
              key={name}
              $selected={selected}
              onClick={() => handleFilterButtonClick(index)}
            >
              {name}
            </FilterButton>
          ))}
        </DivContainer>
        <MainEvents>
          <EventsContainer>
            {categoriesIds.length > 0 ? (
              <AddEventButton onClick={() => router.push("/event/create")}>
                <p>Create Event</p>
              </AddEventButton>
            ) : (
              <></>
            )}
            {loadingState && categoriesIds.length > 0 ? (
              <StatusImage src={loaderLogo.src} alt="loader" $size={"50px"} />
            ) : selectedCategoryIdState ? (
              eventState[selectedCategoryIdState]?.map(
                ({ _id, banner: { path }, name }) => (
                  <EventCard
                    key={_id}
                    $bgImg={path || ""}
                    onClick={() => router.push(`/event/about/${_id}`)}
                  >
                    <EventName>{name}</EventName>
                  </EventCard>
                )
              )
            ) : (
              <></>
            )}
          </EventsContainer>
        </MainEvents>
      </HomeScreenContainer>
    </MainHomeScreen>
  );
};

export default HomeScreen;
