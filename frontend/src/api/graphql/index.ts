import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// interfaces
import {
  ICategoriesResponse,
  IEventResponse,
  IEventsResponse,
} from "./interface";

const SERVER_GRAPHQL_URL = process.env.NEXT_PUBLIC_SERVER_GRAPHQL_URL;

export const getCategories = async (
  token: string
): Promise<ICategoriesResponse> => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: SERVER_GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let response: ICategoriesResponse = {
    data: [],
    error: "",
    success: false,
  };
  try {
    const { data } = await client.query({
      query: gql`
        query GetCategories {
          getCategories {
            data {
              _id
              name
              events {
                author {
                  avatar {
                    path
                  }
                  onlineStatus
                  username
                }
                banner {
                  path
                }
                description
                endDate
                name
              }
            }
            error
            success
          }
        }
      `,
    });

    response = {
      ...data.getCategories,
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

export const getEventsByCategoryId = async (
  token: string,
  categoryId: string
): Promise<IEventsResponse> => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: SERVER_GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let response: IEventsResponse = {
    data: [],
    error: "",
    success: false,
  };
  try {
    const { data } = await client.query({
      query: gql`
         query GetEvents {
           getEvents(
             categoryId: \"${categoryId}\",
           ) {
             data {
                _id
                author {
                _id
                onlineStatus
                username
                avatar {
                  path
                  publicId
                }
              }
              banner {
                path
              }
              categories {
                name
              }
              createdAt
              description
              endDate
              name
              price
              registered
             }
             error
             success
           }
         }
       `,
    });

    response = {
      ...data.getEvents,
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

export const getEventsByCategoryIdAndTimeline = async (
  token: string,
  categoryId: string,
  timeline: string
): Promise<IEventsResponse> => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: SERVER_GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let response: IEventsResponse = {
    data: [],
    error: "",
    success: false,
  };
  try {
    const { data } = await client.query({
      query: gql`
         query GetEvents {
           getEventsByCategoryIdAndTimeline(
             categoryId: \"${categoryId}\",
             timeline: \"${timeline}\"
           ) {
             data {
               _id
               author {
                _id
                onlineStatus
                username
                avatar {
                  path
                  publicId
                }
              }
              banner {
                path
              }
              categories {
                name
              }
              createdAt
              description
              endDate
              name
              price
              registered
             }
             error
             success
           }
         }
       `,
    });

    response = {
      ...data.getEventsByCategoryIdAndTimeline,
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

export const getEventById = async (
  token: string,
  eventId: string
): Promise<IEventResponse> => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: SERVER_GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let response: IEventResponse = {
    data: null,
    error: "",
    success: false,
  };
  try {
    const { data } = await client.query({
      query: gql`
        query GetEvent {
          getEvent(_id: \"${eventId}\") {
            data {
              _id
              attendees {
                username
              }
              description
              endDate
              name
              price
              startDate
              registrationDeadline
              type
              createdAt
              updatedAt
              registered
              banner {
                path
                publicId
              }
              author {
                _id
                onlineStatus
                username
                avatar {
                  path
                  publicId
                }
              }
              categories {
                _id
                name
              }
            }
            error
            success
          }
        }
      `,
    });

    response = {
      ...data.getEvent,
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

export const getMyEvents = async (token: string): Promise<IEventsResponse> => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: SERVER_GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let response: IEventsResponse = {
    data: [],
    error: "",
    success: false,
  };
  try {
    const { data } = await client.query({
      query: gql`
        query GetMyEvents {
          getMyEvents {
            data {
              _id
              description
              endDate
              name
              price
              startDate
              registrationDeadline
              type
              createdAt
              updatedAt
              registered
              banner {
                path
                publicId
              }
              author {
                _id
                onlineStatus
                username
                avatar {
                  path
                  publicId
                }
              }
              categories {
                _id
                name
              }
            }
            error
            success
          }
        }
      `,
    });

    response = {
      ...data.getMyEvents,
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

export const registerForEvent = async (
  token: string,
  eventId: string
): Promise<IEventResponse> => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: SERVER_GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let response: IEventResponse = {
    data: null,
    error: "",
    success: false,
  };
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation RegisterForEvent {
          registerForEvent(eventId: \"${eventId}\") {
            data {
              _id
              description
              endDate
              name
              price
              startDate
              registered
              registrationDeadline
              type
              createdAt
              updatedAt
              banner {
                path
                publicId
              }
              author {
                _id
                onlineStatus
                username
                avatar {
                  path
                  publicId
                }
              }
              categories {
                _id
                name
              }
            }
            error
            success
          }
        }
      `,
    });

    response = {
      ...data.registerForEvent,
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
