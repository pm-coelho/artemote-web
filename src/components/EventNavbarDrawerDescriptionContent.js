import React from 'react';

import {
  Box,
  Text,
  Image,
} from '@chakra-ui/react';

const EventNavbarDrawerDescriptionContent = ({event}) => {
  return (

    <Box>
          <Image
            src={event?.image}
            float="right"
            width="35%"
            ml="10px"
            mb="10px"
          />
          {event?.description.split("\n").map((line, i ) => 
            <Text
              key={i}
              mt='1'
              color='gray.500'
              fontSize='sm'
              noOfLines={40}
              textAlign="left"
            >
              {line}
            </Text>
          )}
        </Box>
  );
}

export default EventNavbarDrawerDescriptionContent;
