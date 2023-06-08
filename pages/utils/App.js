import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    DefaultOptions,
  } from "@apollo/client";
  import { setContext } from "@apollo/client/link/context";
  import { createUploadLink } from "apollo-upload-client";
  import { ApolloProvider } from "@apollo/client";
  
  export const getServerUrl = () => {
    let url = "https://ronb-tes.calcgen.com";
    if (process.env.NODE_ENV === "production") {
      //     url = `https://${process.env.NEXT_PUBLIC_API_URI}/api`
      url = `https://ronb-tes.calcgen.com`;
    }
    return url;
  };
  export const getSecondServerUrl = () => {
    let url = "https://ronb-tes.calcgen.com";
    if (process.env.NODE_ENV === "production") {
      //     url = `https://${process.env.NEXT_PUBLIC_API_URI}/api`
      url = `https://ronb-tes.calcgen.com`;
    }
    return url;
  };
  
  const httpLink = createUploadLink({
    uri: `${getServerUrl()}/graphql/`,
    credentials: "include",
  
    // uri: 'http://206.189.141.84:8002/graphql/',
    // uri: 'http://localhost:8000/graphql/',
  });
  
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    //   const token = localStorage.getItem('token')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        // 'Content-type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        // 'boundary':"---------------------------293582696224464"
        //   Authorization: token ? `JWT ${token}` : "",
      },
    };
  });
  
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  };
   const client = new ApolloClient({
    link: authLink.concat(httpLink),
    credentials: "include",
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  });
  
  const httpLinks = createUploadLink({
    uri: `${getSecondServerUrl()}/graphql-nest/`,
    credentials: "include",
  });
  
  export const secondClient = new ApolloClient({
    link: authLink.concat(httpLinks),
    credentials: "include",
    cache: new InMemoryCache(),
  });
  


export default client;
