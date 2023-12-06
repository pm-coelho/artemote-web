import React from 'react';
import {
  Box,
  VStack,
  Grid,
} from '@chakra-ui/react';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
          <VStack spacing={2}>
            <NavBar />
            {children}
          </VStack>
        </Grid>
      </Box>
  );
}

export default Layout;
