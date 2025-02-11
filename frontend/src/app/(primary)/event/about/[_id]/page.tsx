"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// socket
import {
  emitEvents,
  IEventRoom,
  IEventRoomAttendeeNotification,
  onEvents,
} from "@/api/socket";
// store
import { useDefaultStore } from "@/store";
// styles
import {
  Banner,
  EventCategory,
  EventDescription,
  EventName,
  EventSection,
  JoinButton,
  MainAboutEvent,
} from "@/app/styles/AboutEvent.styles";
import { StatusImage } from "@/app/styles/shared/Image.styles";
// utils
import { screens } from "@/app/utils/data";
import {
  DivContainer,
  MainContainer,
} from "@/app/styles/shared/Container.styles";
import { IEvent } from "@/api/graphql/interface";
import { getEventById, registerForEvent } from "@/api/graphql";
import { FormLink } from "@/app/styles/AuthenticationScreen/index.styles";
import {
  CategoryContainer,
  CategoryScroller,
} from "@/app/styles/HomeScreen.styles";

const AboutEvent = () => {
  const { event_room_error, event_room_success, join_event_rooms_success } =
    emitEvents;
  const { join_event_rooms } = onEvents;
  const { navbarHeightState, setSelectedCategoryIdState, userState } =
    useDefaultStore();
  const {
    default: {
      assets: { loaderLogo },
    },
  } = screens;

  const { _id } = useParams();

  const router = useRouter();

  const [eventState, setEventState] = useState<IEvent>();
  const [justRSVPedState, setJustRSVPedState] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [totalAttendeesState, setTotalAttendeesState] = useState(0);

  const { token } = userState;

  const handleRSVPEvent = async () => {
    setLoadingState(true);

    const { error, success } = await registerForEvent(token, String(_id));

    setLoadingState(false);

    if (!success) {
      window.alert(error);
      return;
    }

    setJustRSVPedState(true);
  };

  const handleEventCategoryClick = (_id: string) => {
    setSelectedCategoryIdState(_id);

    router.push("/");
  };

  useEffect(() => {
    if (!token) {
      router.push("/");
    }

    setLoadingState(true);

    getEventById(token, String(_id))
      .then((res) => {
        const { data, error, success } = res;

        setLoadingState(false);

        if (!success) {
          window.alert(error);
          return;
        }

        setEventState(data);
      })
      .catch((err) => {
        // console.log(err);

        setLoadingState(false);
      });
  }, [_id, justRSVPedState, token]);

  useEffect(() => {
    if (eventState) {
      setTotalAttendeesState(eventState.attendees.length);
    }
  }, [eventState]);

  useEffect(() => {
    const { socket } = userState;

    socket.on(
      join_event_rooms_success,
      (payload: IGenericResponse<IEventRoom>) => {
        // console.log(payload);
      }
    );

    socket.emit(join_event_rooms);

    socket.on(
      event_room_success,
      (payload: IGenericResponse<IEventRoomAttendeeNotification>) => {
        const { data, error, success } = payload;

        if (success) {
          if (data.eventId === _id) {
            setTotalAttendeesState(data.totalAttendees);

            getEventById(token, String(_id))
              .then((res) => {
                const { data, error, success } = res;

                setLoadingState(false);

                if (!success) {
                  window.alert(error);
                  return;
                }

                setEventState(data);
              })
              .catch((err) => {
                // console.log(err);

                setLoadingState(false);
              });
          }
        }
      }
    );
  }, [userState]);

  return (
    <MainAboutEvent $marginTop={navbarHeightState}>
      {loadingState && !eventState ? (
        <StatusImage src={loaderLogo.src} alt="loader" $size="50px" />
      ) : eventState ? (
        <MainContainer $alignItems="center">
          <Banner $bgImg={eventState.banner.path!} />
          <DivContainer $margin="30px 0px 0px">
            <DivContainer $alignItems="flex-start" $width="100%">
              <FormLink onClick={() => router.push("/")}>
                Go to Dashboard
              </FormLink>
            </DivContainer>
            <DivContainer
              $flexDirection="row"
              $justifyContent="space-between"
              $width="100%"
            >
              <DivContainer $flexDirection="row" $width="fit-content">
                <EventName>{eventState.name}</EventName>
                <DivContainer $width="fit-content" $margin="0px 0px 0px 10px">
                  {eventState.author?.avatar.path ? (
                    <StatusImage
                      src={eventState.author?.avatar.path}
                      alt="avatar"
                    />
                  ) : (
                    <></>
                  )}
                </DivContainer>
              </DivContainer>
              {loadingState && eventState ? (
                <StatusImage src={loaderLogo.src} alt="loader" $size="40px" />
              ) : (
                <JoinButton
                  disabled={eventState.registered}
                  onClick={handleRSVPEvent}
                >
                  {eventState.registered ? "RSVPed" : "Join"}
                </JoinButton>
              )}
            </DivContainer>
            <DivContainer
              $alignItems="flex-start"
              $miscellanous="min-height: 40vh;"
              $width="100%"
            >
              <EventDescription>{eventState.description}</EventDescription>
            </DivContainer>
            <DivContainer
              $flexDirection="row"
              $width="100%"
              $margin="0px 0px 20px 0px"
            >
              Location:
              <EventCategory>{eventState.type}</EventCategory>
            </DivContainer>
            <DivContainer
              $flexDirection="column"
              $alignItems="flex-start"
              $width="100%"
              $margin="0px 0px 20px 0px"
            >
              <EventSection>Attendees ({totalAttendeesState}):</EventSection>
              <CategoryScroller>
                <CategoryContainer>
                  {eventState.attendees.map(({ _id, username }) => (
                    <EventCategory key={Math.random()}>
                      {username}
                    </EventCategory>
                  ))}
                </CategoryContainer>
              </CategoryScroller>
            </DivContainer>
            <DivContainer
              $flexDirection="column"
              $alignItems="flex-start"
              $width="100%"
              $margin="0px 0px 20px 0px"
            >
              <EventSection>Categories:</EventSection>
              <CategoryScroller>
                <CategoryContainer>
                  {eventState.categories.map(({ _id, name }) => (
                    <EventCategory
                      key={_id}
                      onClick={() => handleEventCategoryClick(_id)}
                    >
                      {name}
                    </EventCategory>
                  ))}
                </CategoryContainer>
              </CategoryScroller>
            </DivContainer>
          </DivContainer>
        </MainContainer>
      ) : (
        <h2>No events found</h2>
      )}
    </MainAboutEvent>
  );
};

export default AboutEvent;
