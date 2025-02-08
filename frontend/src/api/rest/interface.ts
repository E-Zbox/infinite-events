export interface ICreateEventPayload {
  bannerImage: File;
  categoryIds: string[];
  description: string;
  endDate: number;
  name: string;
  price: string;
  registrationDeadline: number;
  startDate: number;
  type: string;
}

export interface ICreateUserPayload {
  email: string;
  password: string;
  username: string;
}

export interface ISignInUserPayload {
  email: string;
  password: string;
}

export interface IGenericResponse<T> {
  data: T;
  error: string;
  success: boolean;
}

interface IUser {
  _id: any;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUsernameExists {
  usernameExists: boolean;
}

export interface IUsernameExistsResponse
  extends IGenericResponse<IUsernameExists | any> {}

export interface IUserResponse extends IGenericResponse<IUser | any> {}
