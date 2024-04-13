import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';

function MainContainer() {
  return (
    <>
      <Box className="wrapper" bg={'gray.300'}>
        <Navbar />
        <Outlet />
        <Footer />
      </Box>
    </>
  );
}

export default MainContainer;
