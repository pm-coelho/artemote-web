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
  setIsLocked,
  isLocked,
}) => {

  const content = isLocked ? (
    <Box>
      <Heading color='white' >
        <Highlight
          query='emotions'
          styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal' }}
        >
          Pause for a moment to reflect on the emotions this artwork evokes.
        </Highlight>
      </Heading>
      <Text fontSize="sm" width="70%" color='white' >
        When ready share the emotion that best describes your feelings.
      </Text>
      <AddEmotionForm
        artwork={artwork}
        setArtwork={setArtwork}
        setIsLocked={setIsLocked}
      />
    </Box>
  ): (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      height="100%"
    >
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

      </Box>
      <Box
        minHeight="250px"
        width="95%"
        height="95%"
      >
        <EmotionsChart data={artwork?.emotions} />
      </Box>
      <Box width="100%" >
        <AddEmotionForm
          artwork={artwork}
          setArtwork={setArtwork}
          setIsLocked={setIsLocked}
          placeholder="Felt something else?"
          _placeholder={{
            color: "white",
            fontSize: "0.5em",
          }}
        />
      </Box>
    </Box>
  )

  return (
    <ArtworkOverlay>
      {content}
    </ArtworkOverlay>
  )
}

export default EmotionsOverlay;

