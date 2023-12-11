import React from 'react';

import {
  Box,
  Text,
  Highlight,
} from '@chakra-ui/react';


const ArtworkDetail = ({artwork, isStatsUnlocked}) => {
  return (
    <Box
      overflowY='auto'
      maxH='200px'
      minH='170px'
      pt={3}
      pl={5}
      pr={5}
    >
      {isStatsUnlocked ? (
      artwork?.description.split("\n").map((line, i ) => 
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
      )) : (
        <Text
          mt='1'
          color='gray.500'
          fontSize='sm'
          noOfLines={40}
          textAlign="center"
          pt={7}
        >
          <Highlight
            query='artwork makes you feel'
            styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal' }}
          >
          </Highlight>
        </Text>
      )
      }
    </Box>
  )
}

export default ArtworkDetail;
