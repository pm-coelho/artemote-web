import React from 'react'
import {
  Heading,
  Text,
  Highlight,
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
      <Heading
        lineHeight='tall'
        color='white'
      >
        <Highlight
          query='you feel'
          styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal' }}
        >
          Tell us what you feel when you look at this artwork
        </Highlight>
      </Heading>
      <Text fontSize="sm" width="70%"
            color='white'
      >
        Take a moment to reflect on the artwork and write a one word
        description of how it makes you feel.
      </Text>
      <AddEmotionForm
        artwork={artwork}
        setArtwork={setArtwork}
        setIsStatsUnlocked={setIsStatsUnlocked}
      />
    </ArtworkOverlay>
  )
}

export default AddEmotionOverlay
