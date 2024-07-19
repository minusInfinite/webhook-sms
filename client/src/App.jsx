import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import Home from './content/Home';
import Dashboard from './content/Dashboard';
import Login from './content/Login';
import Signup from './content/Signup';
import NoRoute from './content/NoRoute';
import overrides from './theme';

const theme = extendTheme(overrides);

function App() {
  return (
    <>
      <ChakraProvider theme={ theme }>
        <Routes>
          <Route path="/" element={ <MainContainer /> }>
            <Route index element={ <Home /> } />
            <Route path="/dashboard" element={ <Dashboard /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <Signup /> } />
            <Route path="*" element={ <NoRoute /> } />
          </Route>
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
