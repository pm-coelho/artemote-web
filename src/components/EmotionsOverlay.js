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
        Explore how you and others felt about this artwork.
        Check back later to witness how the results evolve.
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

