import React from 'react'
import {
  Heading,
  Text,
  Highlight,
  Box,
} from '@chakra-ui/react'

import ArtworkOverlay from './ArtworkOverlay'
import AddEmotionForm from './AddEmotionForm'

const AddEmotionOverlay = ({
  artwork,
  setArtwork,
  setIsStatsUnlocked,
}) => {

  return (
    <ArtworkOverlay >
    <Box>
    <Heading color='white' >
    <Highlight
    query='reflect'
    styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal' }}
    >
    We invite you to take a moment to reflect on how this artwork makes you feel.
      </Highlight>
    </Heading>
    <Text fontSize="sm" width="70%" color='white' >
    When ready share the emotion that best describes your feelings.
      </Text>
    <AddEmotionForm
    artwork={artwork}
    setArtwork={setArtwork}
    setIsStatsUnlocked={setIsStatsUnlocked}
      />
    </Box>
    </ArtworkOverlay>
  )
}

export default AddEmotionOverlay
