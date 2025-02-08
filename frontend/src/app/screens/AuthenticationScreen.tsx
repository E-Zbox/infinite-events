"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
// api
import { checkUsername, signInUser, signUpUser } from "@/api/rest/auth";
// store
import { useDefaultStore } from "@/store";
// styles
import {
  Form,
  FormLink,
  FormTitle,
  InputContainer,
  InputError,
  InputLabel,
  MainAuthScreen,
  MainForm,
  MainImageScroller,
  PasswordViewButton,
  SubmitButton,
  SubTitle,
  TextInput,
} from "../styles/AuthenticationScreen.styles";
import { DivContainer } from "../styles/shared/Container.styles";
import { StatusImage } from "../styles/shared/Image.styles";
// utils
import { screens } from "../utils/data";

interface IUsernameExists {
  exists: null | boolean;
  loading: boolean;
}

const AuthenticationScreen = () => {
  const [formState, setFormState] = useState({
    input_email: "",
    input_password: "",
    input_username: "",
    loading: false,
  });
  const [showSignInFormState, setShowSignInFormState] = useState(false);
  const [showPasswordState, setShowPasswordState] = useState(false);
  const [usernameExistsState, setUsernameExistsState] =
    useState<IUsernameExists>({
      exists: null,
      loading: false,
    });

  const {
    authentication: {
      assets: { checkmarkLogo, hidePasswordLogo, showPasswordLogo },
    },
    default: {
      assets: { loaderLogo },
    },
  } = screens;

  const { userState, setUserState } = useDefaultStore();

  const handleInputChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));

    if (name == "input_username") {
      setUsernameExistsState({ exists: null, loading: false });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      input_email: email,
      input_password: password,
      input_username: username,
    } = formState;

    // verify email regex pattern
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      window.alert("Invalid email passed");
      return;
    }

    if (showSignInFormState) {
      setFormState((prevState) => ({ ...prevState, loading: true }));

      const { data, error, success } = await signInUser({ email, password });

      setFormState((prevState) => ({ ...prevState, loading: false }));

      if (!success) {
        window.alert(error);
        return;
      }

      const { token, username } = data;

      setUserState({ signedIn: true, token, username });
    } else {
      setFormState((prevState) => ({ ...prevState, loading: true }));

      const { data, error, success } = await signUpUser({
        email,
        password,
        username,
      });

      setFormState((prevState) => ({ ...prevState, loading: false }));

      if (!success) {
        window.alert(error);
        return;
      }

      setShowSignInFormState(true);

      window.alert("Sign into your new account!");
    }
  };

  const handleUsernameInputBlur = async () => {
    const { input_username } = formState;
    const { exists, loading } = usernameExistsState;

    if (input_username.length > 0 && exists == null && !loading) {
      // check if username is taken
      setUsernameExistsState({ exists: null, loading: true });

      let usernameExists = null;

      const { data, error, success } = await checkUsername(input_username);

      if (!success) {
        window.alert(error);
      } else {
        ({ usernameExists } = data);
      }

      setUsernameExistsState({ exists: usernameExists, loading: false });
    }
  };

  useEffect(() => {
    setFormState({
      input_email: "",
      input_password: "",
      input_username: "",
      loading: false,
    });

    setShowPasswordState(false);
  }, [showSignInFormState]);

  return (
    <MainAuthScreen>
      <MainImageScroller></MainImageScroller>
      <MainForm>
        <FormTitle>
          {showSignInFormState ? "Sign-in to continue" : "Create an Account"}
        </FormTitle>
        <DivContainer
          $flexDirection="row"
          $alignItems="center"
          $margin="10px 0px 0px"
        >
          <SubTitle>
            {showSignInFormState
              ? "Don't have an account?"
              : "Already have an account?"}
          </SubTitle>
          <FormLink
            onClick={() => setShowSignInFormState((prevState) => !prevState)}
          >
            {showSignInFormState ? "Sign Up" : "Sign In"}
          </FormLink>
        </DivContainer>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            {/* <InputLabel>Email</InputLabel> */}
            <TextInput
              autoComplete="off"
              name="input_email"
              placeholder="Email"
              required
              value={formState.input_email}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            {/* <InputLabel>Password</InputLabel> */}
            <TextInput
              autoComplete="off"
              name="input_password"
              placeholder="Enter your Password"
              required
              value={formState.input_password}
              type={showPasswordState ? "text" : "password"}
              onChange={handleInputChange}
            />
            <PasswordViewButton
              src={
                showPasswordState ? hidePasswordLogo.src : showPasswordLogo.src
              }
              alt={"toggle-password-view"}
              onClick={() => setShowPasswordState((prevState) => !prevState)}
            />
          </InputContainer>
          {showSignInFormState ? (
            <></>
          ) : (
            <>
              <InputContainer $border={usernameExistsState.exists == true}>
                {/* <InputLabel>Username</InputLabel> */}
                {/* add loader and check mark to validate if username has been taken */}
                <TextInput
                  autoComplete="off"
                  name="input_username"
                  placeholder="Username"
                  required
                  value={formState.input_username}
                  onBlur={handleUsernameInputBlur}
                  onChange={handleInputChange}
                />
                {usernameExistsState.loading ? (
                  <StatusImage
                    src={loaderLogo.src}
                    alt="loading"
                    $size="50px"
                  />
                ) : (
                  <></>
                )}
                {usernameExistsState.exists == false ? (
                  <StatusImage src={checkmarkLogo.src} alt={"checkmark"} />
                ) : (
                  <></>
                )}
              </InputContainer>
              {usernameExistsState.exists == true ? (
                <InputError>this username is already taken</InputError>
              ) : (
                <></>
              )}
            </>
          )}
          {formState.loading ? (
            <DivContainer $width="100%">
              <StatusImage src={loaderLogo.src} alt={"loader"} $size="60px" />
            </DivContainer>
          ) : (
            <SubmitButton
              disabled={
                showSignInFormState
                  ? formState.input_email.length == 0 ||
                    formState.input_password.length == 0
                  : formState.input_email.length == 0 ||
                    formState.input_password.length == 0 ||
                    formState.input_username.length == 0 ||
                    usernameExistsState.exists === null
              }
            >
              {showSignInFormState ? "Sign In" : "Create account"}
            </SubmitButton>
          )}
        </Form>
        <button>Continue as Guest</button>
      </MainForm>
    </MainAuthScreen>
  );
};

export default AuthenticationScreen;
