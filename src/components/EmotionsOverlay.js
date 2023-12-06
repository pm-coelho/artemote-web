import React from 'react';
import {
  Heading,
  Text,
  Highlight,
} from '@chakra-ui/react';

import EmotionsChart from './EmotionsChart';
import ArtworkOverlay from './ArtworkOverlay';

const EmotionsOverlay = ({ artwork }) => {
  return (
    <ArtworkOverlay>
      <Heading
        lineHeight='tall'
        color='white'
        width="90%"
      >
        Thank you for participating in this experiment!
      </Heading>
      <Text
        fontSize="sm"
        width="70%"
        color='white'
      >
        Here is how you and others felt about this artwork.
        Please come back later to see how the results change.
      </Text>

      <EmotionsChart data={artwork?.emotions} />
    </ArtworkOverlay>
  )
}

export default EmotionsOverlay;

