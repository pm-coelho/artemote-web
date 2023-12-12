import React from 'react';
import {
  Heading,
  Text,
  Box,
  Highlight,
} from '@chakra-ui/react';

import EmotionsChart from './EmotionsChart';
import ArtworkOverlay from './ArtworkOverlay';
import AddEmotionForm from './AddEmotionForm';

const EmotionsOverlay = ({
  artwork,
  setArtwork,
  setIsSeen,
  isSeen,
}) => {

  const content = isSeen ? (
    <Box>
      <Heading
        color='white'
        width="90%"
      >
        Thank you for Participating!
      </Heading>
      <Text
        fontSize="sm"
        width="70%"
        color='white'
      >
        Explore how you and others felt about this artwork.
        Check back later to witness how the results evolve.
      </Text>

      <Box
        minHeight="250px"
      >
      <EmotionsChart data={artwork?.emotions} />
      </Box>
      <AddEmotionForm
        artwork={artwork}
        setArtwork={setArtwork}
        setIsSeen={setIsSeen}
        placeholder="Felt something else?"
        _placeholder={{
          color: "white",
          fontSize: "0.5em",
        }}
      />
    </Box>
  ): (
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
        setIsSeen={setIsSeen}
      />
    </Box>

  )


  return (
    <ArtworkOverlay>
      {content}
    </ArtworkOverlay>
  )
}

export default EmotionsOverlay;

