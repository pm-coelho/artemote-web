import React from 'react'
import {
  Heading,
  Text,
  Highlight,
  Box,
} from '@chakra-ui/react'

import ArtworkOverlay from './ArtworkOverlay'
import AddEmotionForm from './AddEmotionForm'

const ArtDetailOverlay = ({
  artwork,
  setArtwork,
  setIsStatsUnlocked,
}) => {

  return (
    <ArtworkOverlay >
    <Box
      overflowY="auto"
      maxH="100%"
      p={5}
    >
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
