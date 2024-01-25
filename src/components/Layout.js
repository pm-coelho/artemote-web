import React from 'react';
import {
  Box,
  VStack,
  Grid,
} from '@chakra-ui/react';
import NavBar from './NavBar';

const Layout = ({ artwork, event, artist, children }) => {
  return (
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
          <VStack spacing={2}>
            <NavBar artwork={artwork} event={event} artist={artist}/>
            {children}
          </VStack>
        </Grid>
      </Box>
  );
}

export default Layout;
