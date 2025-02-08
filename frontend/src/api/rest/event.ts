import { instance } from ".";
import { IEventResponse } from "../graphql/interface";
// interfaces
import { ICreateEventPayload } from "./interface";

export const createEvent = async (
  token: string,
  payload: ICreateEventPayload
): Promise<IEventResponse> => {
  let response: IEventResponse = {
    data: null,
    error: "",
    success: false,
  };
  try {
    const {
      bannerImage,
      categoryIds,
      description,
      endDate,
      name,
      price,
      registrationDeadline,
      startDate,
      type,
    } = payload;

    const formData = new FormData();
    formData.append("bannerImage", bannerImage);

    for (let index = 0; index < categoryIds.length; index++) {
      formData.append("categoryIds[]", categoryIds[index]);
    }

    formData.append("description", description);
    formData.append("endDate", String(endDate));
    formData.append("name", name);
    formData.append("price", price);
    formData.append("registrationDeadline", String(registrationDeadline));
    formData.append("startDate", String(startDate));
    formData.append("type", type);

    const result = await instance.post("/event", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
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
