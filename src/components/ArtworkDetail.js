import React from 'react';

import {
  Box,
  Text,
} from '@chakra-ui/react';


const ArtworkDetail = ({artwork, isStatsUnlocked}) => {
  return (
    <Box
      overflowY="auto"
      maxH="100%"
    >
      {artwork?.description.split("\n").map((line, i ) => 
        <Text
          key={i}
          mt='1'
          color='gray.500'
          fontSize='sm'
          noOfLines={40}
          textAlign="left"
        >
          {line}
        </Text>
      )}
    </Box>
  )
}

export default ArtworkDetail;
