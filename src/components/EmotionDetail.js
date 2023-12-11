import React from 'react';

import {
  Box,
} from '@chakra-ui/react';

import EmotionsChart from './EmotionsChart';


const EmotionDetail = ({artwork, isStatsUnlocked}) => {
  return (
    <Box
      overflowY='auto'
      width='inherit'
      height='inherit'
    >
      <EmotionsChart
        data={artwork?.emotions}
      />
    </Box>
  )
}

export default EmotionDetail;
