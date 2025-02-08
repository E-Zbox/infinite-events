interface IAvatar {
  path: null | string;
  publicId: null | string;
}

export interface ICategory {
  _id: string;
  name: string;
  events?: IEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface IEvent {
  _id: string;
  attendees: IUser[];
  author?: IUser;
  banner: IAvatar;
  categories: ICategory[];
  description: string;
  endDate: string;
  name: string;
  price: string;
  registered?: boolean;
  registrationDate: string;
  startDate: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface IUser {
  _id: string;
  avatar: IAvatar;
  onlineStatus: boolean;
  username: string;
}

export interface ICategoriesResponse extends IGenericResponse<ICategory[]> {}

export interface IEventResponse extends IGenericResponse<IEvent | any> {}

export interface IEventsResponse extends IGenericResponse<IEvent[]> {}
