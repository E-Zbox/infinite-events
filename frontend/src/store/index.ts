import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { ICategory as Category, IEvent } from "@/api/graphql/interface";

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

interface ICategory extends Category {
  selected: boolean;
}

export interface ICategoryState {
  [_id: string]: ICategory;
}

export interface IEventState {
  [categoryId: string]: IEvent[];
}

interface IUserState {
  isGuest: boolean;
  signedIn: boolean;
  socket: Socket;
  token: string;
  username: string;
}

interface IStore {
  categoryState: ICategoryState;
  setCategoryState: (newState: ICategoryState) => void;
  selectCategoryState: (categoryId: string) => void;
  selectedCategoryIdState: string;
  setSelectedCategoryIdState: (newState: string) => void;
  eventState: IEventState;
  setEventState: (newState: IEventState) => void;
  navbarHeightState: string;
  setNavbarHeightState: (newState: string) => void;
  userState: IUserState;
  setUserState: (newState: IUserState) => void;
}

export const useDefaultStore = create<IStore>((set) => ({
  categoryState: {},
  setCategoryState: (newState: ICategoryState) =>
    set({ categoryState: newState }),
  selectCategoryState: (categoryId: string) =>
    set((prevState) => {
      const categoriesIds = Object.getOwnPropertyNames(prevState.categoryState);

      const newCategoryState: ICategoryState = {};

      categoriesIds.forEach((_id) => {
        newCategoryState[_id] = {
          ...prevState.categoryState[_id],
          selected: categoryId === _id,
        };
      });

      return {
        ...prevState,
        categoryState: newCategoryState,
      };
    }),
  selectedCategoryIdState: "",
  setSelectedCategoryIdState: (newState: string) =>
    set({ selectedCategoryIdState: newState }),
  eventState: {},
  setEventState: (newState: IEventState) =>
    set((prevState) => ({
      ...prevState,
      eventState: { ...prevState.eventState, ...newState },
    })),
  navbarHeightState: "0px",
  setNavbarHeightState: (newState: string) =>
    set({ navbarHeightState: newState }),
  userState: {
    isGuest: false,
    signedIn: false,
    socket: io(`${SOCKET_URL}/socket/user`, {
      query: {
        // namespace: "/socket/user",
      },
    }),
    token: "",
    username: "",
  },
  setUserState: (newState: IUserState) => set({ userState: newState }),
}));

interface IEventPageStore {
  categoryState: ICategoryState;
  setCategoryState: (newState: ICategoryState) => void;
  toggleCategorySelectedState: (categoryId: string) => void;
  eventState: IEvent[];
  setEventState: (newState: IEvent[]) => void;
}

export const useEventPageStore = create<IEventPageStore>((set) => ({
  categoryState: {},
  setCategoryState: (newState: ICategoryState) =>
    set({ categoryState: newState }),
  toggleCategorySelectedState: (categoryId: string) =>
    set((prevState) => {
      const categoriesIds = Object.getOwnPropertyNames(prevState.categoryState);

      const newCategoryState: ICategoryState = {};

      categoriesIds.forEach((_id) => {
        const category = prevState.categoryState[_id];
        newCategoryState[_id] = {
          ...category,
          selected: categoryId === _id ? !category.selected : category.selected,
        };
      });

      return {
        ...prevState,
        categoryState: newCategoryState,
      };
    }),
  eventState: [],
  setEventState: (newState: IEvent[]) => set({ eventState: newState }),
}));
