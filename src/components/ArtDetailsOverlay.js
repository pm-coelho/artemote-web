import React from 'react'
import {
  Text,
  Box,
} from '@chakra-ui/react'

import ArtworkOverlay from './ArtworkOverlay'

const ArtDetailOverlay = ({
  artwork,
  setArtwork,
  setIsStatsUnlocked,
}) => {

  return (
    <ArtworkOverlay >
    <Box
      overflowY="auto"
      width="100%"
      p={5}
    >
      <Text
        color='white'
        fontSize='2xl'
        fontWeight='bold'
        textAlign="left"
        pb={5}
      >
        {artwork?.title}
      </Text>
      {artwork?.description.split("\n").map((line, i ) => 
        <Text
          key={i}
          mt='1'
          color='white'
          fontSize='md'
          noOfLines={40}
          textAlign="left"
        >
          {line}
        </Text>
      )}
    </Box>
    </ArtworkOverlay>
  )
}

export default ArtDetailOverlay
