import React from 'react';
import {
  Heading,
  Text,
} from '@chakra-ui/react';

import EmotionsChart from './EmotionsChart';
import ArtworkOverlay from './ArtworkOverlay';
import AddEmotionForm from './AddEmotionForm';

const EmotionsOverlay = ({
  artwork,
  setArtwork,
  setIsStatsUnlocked,
}) => {
  return (
    <ArtworkOverlay>
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
        Here is how you and others felt about this artwork.
        Come back later to see how the results change.
      </Text>

      <EmotionsChart data={artwork?.emotions} />
      <AddEmotionForm
        artwork={artwork}
        setArtwork={setArtwork}
        setIsStatsUnlocked={setIsStatsUnlocked}
        placeholder="Felt something else?"
        _placeholder={{
          color: "white",
          fontSize: "0.5em",
        }}
      />
    </ArtworkOverlay>
  )
}

export default EmotionsOverlay;

