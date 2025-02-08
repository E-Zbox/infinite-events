import { instance } from ".";
// interfaces
import {
  ICreateUserPayload,
  ISignInUserPayload,
  IUsernameExistsResponse,
  IUserResponse,
} from "./interface";

export const serverIsAlive = async (): Promise<IUserResponse> => {
  let response: IUserResponse = {
    data: {},
    error: "",
    success: false,
  };
  try {
    const result = await instance.get("/health");

    const { data } = result;

    response = {
      ...data,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const checkUsername = async (
  payload: string
): Promise<IUsernameExistsResponse> => {
  let response: IUsernameExistsResponse = {
    data: null,
    error: "",
    success: false,
  };

  try {
    const result = await instance.get(`/user/${payload}/exists`);

    const { data } = result;

    response = {
      ...data,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const signInUser = async (
  payload: ISignInUserPayload
): Promise<IUserResponse> => {
  let response: IUserResponse = {
    data: null,
    error: "",
    success: false,
  };
  try {
    const result = await instance.post("/auth/user/sign-in", {
      ...payload,
    });

    const { data } = result;

    response = {
      ...data,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const signUpUser = async (
  payload: ICreateUserPayload
): Promise<IUserResponse> => {
  let response: IUserResponse = {
    data: null,
    error: "",
    success: false,
  };
  try {
    const result = await instance.post("/auth/user/sign-up", {
      ...payload,
    });

    const { data } = result;

    response = {
      ...data,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};
