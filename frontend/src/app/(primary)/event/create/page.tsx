"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// api
import { createEvent } from "@/api/rest/event";
// store
import { useDefaultStore, useEventPageStore } from "@/store";
// styles
import {
  FormLink,
  TextInput,
} from "@/app/styles/AuthenticationScreen/index.styles";
import {
  CreateEventTitle,
  EventCategory,
  EventCategoryContainer,
  EventCategoryScroller,
  EventCategoryTitle,
  Form,
  InputContainer,
  InputLabel,
  MainCreateEvent,
  Select,
  SubmitButton,
  TextArea,
} from "@/app/styles/CreateEvent.styles";
import { SectionTitle } from "@/app/styles/HomeScreen.styles";
import {
  DivContainer,
  MainContainer,
} from "@/app/styles/shared/Container.styles";
import { StatusImage } from "@/app/styles/shared/Image.styles";
// utils
import { screens } from "@/app/utils/data";

interface IForm {
  input_description: string;
  input_endDate: string;
  input_name: string;
  input_price: string;
  input_registrationDeadline: string;
  input_startDate: string;
  input_type: string;
}

const CreateEvent = () => {
  const {
    default: {
      assets: { loaderLogo },
    },
  } = screens;
  const { navbarHeightState, userState } = useDefaultStore();
  const { categoryState, toggleCategorySelectedState } = useEventPageStore();

  const [formState, setFormState] = useState<IForm>({
    input_description: "",
    input_endDate: "",
    input_name: "",
    input_price: "",
    input_registrationDeadline: "",
    input_startDate: "",
    input_type: "HYBRID",
  });

  const [fileState, setFileState] = useState<File>();
  const [loadingState, setLoadingState] = useState(false);

  const { isGuest, token, username } = userState;

  const categoriesIds = Object.getOwnPropertyNames(categoryState);

  const router = useRouter();

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (loadingState) {
      return;
    }
    const { name, value } = target;
    if (name === "input_file") {
      if (target?.files) {
        const [file] = target.files;

        setFileState(file);
      }
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSelectChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLSelectElement>) => {
    if (loadingState) {
      return;
    }
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTextAreaChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    if (loadingState) {
      return;
    }
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      input_description: description,
      input_endDate,
      input_name: name,
      input_price: price,
      input_registrationDeadline,
      input_startDate,
      input_type: type,
    } = formState;

    if (
      !description ||
      !fileState ||
      !input_endDate ||
      !name ||
      !price ||
      !input_registrationDeadline ||
      !input_startDate ||
      !type
    ) {
      window.alert("Fill out all fields to continue");
      return;
    }

    const categories = Object.getOwnPropertyNames(categoryState);

    const categoryIds: string[] = [];

    categories.forEach((_id) => {
      if (categoryState[_id].selected) {
        categoryIds.push(_id);
      }
    });

    if (categoryIds.length == 0) {
      window.alert("Select at least one Category to attach Event to");
      return;
    }

    const endDate = Number(new Date(input_endDate));

    const registrationDeadline = Number(new Date(input_registrationDeadline));

    const startDate = Number(new Date(input_startDate));

    setLoadingState(true);

    const { data, error, success } = await createEvent(token, {
      bannerImage: fileState!,
      categoryIds,
      description,
      endDate,
      name,
      price,
      registrationDeadline,
      startDate,
      type,
    });

    setLoadingState(false);

    if (!success) {
      window.alert(error);

      return;
    }

    window.alert(
      "Event created successfully! We are navigating you to your page to view all your events"
    );

    router.push("/event/me");
  };

  useEffect(() => {
    if (!token || isGuest) {
      window.alert("You need to be signed-in to create an event!");
      router.push("/");
    }
  }, [token]);

  return (
    <MainCreateEvent $marginTop={navbarHeightState}>
      <MainContainer $alignItems="flex-start">
        <FormLink onClick={() => router.push("/")}>Go to Dashboard</FormLink>
        <CreateEventTitle>Host your event today, {username}</CreateEventTitle>
        <DivContainer
          $alignItems="flex-start"
          $width="100%"
          $margin="20px 0px 0px"
        >
          <SectionTitle>Select Category(ies)</SectionTitle>
        </DivContainer>
        <EventCategoryScroller>
          <EventCategoryContainer>
            {categoriesIds.map((_id) => {
              const { name, selected } = categoryState[_id];

              return (
                <EventCategory
                  key={_id}
                  $selected={selected}
                  onClick={() => {
                    if (loadingState) {
                      return;
                    }

                    toggleCategorySelectedState(_id);
                  }}
                >
                  <EventCategoryTitle>{name}</EventCategoryTitle>
                </EventCategory>
              );
            })}
          </EventCategoryContainer>
        </EventCategoryScroller>
        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
          <DivContainer $alignItems="flex-start" $width="100%">
            <input name="input_file" type="file" onChange={handleInputChange} />
          </DivContainer>
          <InputLabel>Event's Description</InputLabel>
          <TextArea
            name="input_description"
            placeholder="Describe your event"
            value={formState.input_description}
            onChange={handleTextAreaChange}
          />
          <DivContainer
            $flexDirection="row"
            $alignItems="flex-start"
            $justifyContent="space-between"
            $flexWrap="wrap"
            $width="100%"
          >
            <DivContainer $alignItems="flex-start" $width="fit-content">
              <InputLabel>Event's Start Date</InputLabel>
              <InputContainer>
                <TextInput
                  name="input_startDate"
                  value={formState.input_startDate}
                  type="date"
                  onChange={handleInputChange}
                />
              </InputContainer>
            </DivContainer>
            <DivContainer $alignItems="flex-start" $width="fit-content">
              <InputLabel>Registration Deadline</InputLabel>
              <InputContainer>
                <TextInput
                  name="input_registrationDeadline"
                  value={formState.input_registrationDeadline}
                  type="date"
                  onChange={handleInputChange}
                />
              </InputContainer>
            </DivContainer>
            <DivContainer $alignItems="flex-start" $width="fit-content">
              <InputLabel>Event's End Date:</InputLabel>
              <InputContainer>
                <TextInput
                  name="input_endDate"
                  value={formState.input_endDate}
                  onChange={handleInputChange}
                  type="date"
                />
              </InputContainer>
            </DivContainer>
          </DivContainer>
          <DivContainer
            $flexDirection="row"
            $alignItems="flex-start"
            $justifyContent="space-between"
            $flexWrap="wrap"
            $width="100%"
          >
            <DivContainer $alignItems="flex-start" $width="fit-content">
              <InputLabel>Event's Name:</InputLabel>
              <InputContainer>
                <TextInput
                  name="input_name"
                  value={formState.input_name}
                  onChange={handleInputChange}
                />
              </InputContainer>
            </DivContainer>
            <DivContainer $alignItems="flex-start" $width="fit-content">
              <InputLabel>Entry Fee ($)</InputLabel>
              <InputContainer>
                <TextInput
                  name="input_price"
                  value={formState.input_price}
                  type="number"
                  min="5"
                  max="10000"
                  onChange={handleInputChange}
                />
              </InputContainer>
            </DivContainer>
            <DivContainer $alignItems="flex-start" $width="fit-content">
              <InputLabel>Location</InputLabel>
              <InputContainer>
                <Select
                  name={"input_type"}
                  value={formState.input_type}
                  onChange={handleSelectChange}
                >
                  <option value="HYBRID">HYBRID</option>
                  <option value="PHYSICAL">PHYSICAL</option>
                  <option value="VIRTUAL">VIRTUAL</option>
                </Select>
              </InputContainer>
            </DivContainer>
          </DivContainer>
          {loadingState ? (
            <StatusImage src={loaderLogo.src} alt="loader" $size="50px" />
          ) : (
            <SubmitButton>Create Event</SubmitButton>
          )}
        </Form>
      </MainContainer>
    </MainCreateEvent>
  );
};

export default CreateEvent;
