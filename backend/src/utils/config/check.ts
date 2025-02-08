// interfaces/
import { IRecord } from "../models/interfaces";

export const checkForObjectKeys = (
  expectedKeys: string[],
  object: IRecord
): string => {
  let errorMessage = "";
  const objectKeys = Object.getOwnPropertyNames(object);
  const objectKeysLength = objectKeys.length;

  expectedKeys.forEach((key, index) => {
    if (!objectKeys.includes(key)) {
      errorMessage = `${errorMessage}\`${key}\` property is required.${
        index !== objectKeysLength - 1 ? " " : ""
      }`;
    }
  });

  return errorMessage;
};
