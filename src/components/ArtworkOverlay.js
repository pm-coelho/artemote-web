import React from 'react';
import { Box } from '@chakra-ui/react';

const ArtworkOverlay = ({ children}) => {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.7)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      p={10}
    >
      {children}
    </Box>
  )
}

export default ArtworkOverlay;

