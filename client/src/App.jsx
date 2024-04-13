import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Routes, Route } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Dashboard from "./content/Dashboard";
import Login from "./content/Login";
import Signup from "./content/Signup";
import NoRoute from "./content/NoRoute";
import Home from "./content/Home";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const appTeme = createTheme();

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={appTeme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<MainContainer />}>
              <Route index element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NoRoute />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
