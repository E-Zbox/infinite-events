"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// store
import { useDefaultStore, useEventPageStore } from "@/store";
// styles
import {
  AddEventButton,
  EventCard,
  EventName,
  EventsContainer,
  HomeScreenContainer,
  MainEvents,
  MainHomeScreen,
} from "@/app/styles/HomeScreen.styles";
import { StatusImage } from "@/app/styles/shared/Image.styles";
// utils
import { screens } from "@/app/utils/data";
import { getMyEvents } from "@/api/graphql";
import { FormLink } from "@/app/styles/AuthenticationScreen/index.styles";

const Me = () => {
  const {
    default: {
      assets: { loaderLogo },
    },
  } = screens;
  const { userState } = useDefaultStore();

  const { eventState, setEventState } = useEventPageStore();

  const [loadingState, setLoadingState] = useState(false);

  const { token, username } = userState;

  const router = useRouter();

  useEffect(() => {
    if (token) {
      setLoadingState(true);
      getMyEvents(token)
        .then((res) => {
          const { data, error, success } = res;

          setLoadingState(false);

          if (success) {
            setEventState(data!);
          } else {
            window.alert(error);
          }
        })
        .catch((err) => {
          console.log(err);

          setLoadingState(false);
        });
    }
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  return (
    <MainHomeScreen>
      <HomeScreenContainer>
        <FormLink onClick={() => router.push("/")}>Go to Dashboard</FormLink>
        <h2>Manage all your events, {username}</h2>
        <MainEvents>
          <EventsContainer>
            <AddEventButton onClick={() => router.push("/event/create")}>
              <p>Create Event</p>
            </AddEventButton>
            {loadingState ? (
              <StatusImage src={loaderLogo.src} alt="loader" $size={"50px"} />
            ) : (
              eventState.map(({ _id, banner: { path }, name }) => (
                <EventCard
                  key={_id}
                  $bgImg={path || ""}
                  onClick={() => router.push(`/event/about/${_id}`)}
                >
                  <EventName>{name}</EventName>
                </EventCard>
              ))
            )}
          </EventsContainer>
        </MainEvents>
      </HomeScreenContainer>
    </MainHomeScreen>
  );
};

export default Me;
