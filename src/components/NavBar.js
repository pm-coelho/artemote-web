import React from 'react';
import {
  Box,
  Heading,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import EventNavbarDrawer from './EventNavbarDrawer';

const NavBar = ({ artwork, event }) => {
  const { isOpen, onOpen, onClose} = useDisclosure()

  return (
    <Box
      as="nav"
      width="100%"
      boxShadow="lg"
      position="sticky"
      top="0"
      zIndex="sticky"
      alignItems="center"
      backgroundColor={useColorModeValue("white", "gray.800")}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        p={2}
        alignItems="center"
        maxH="50"
      >
        <Box
          onClick={event ? onOpen : () => {}}
          width="90%"
          textAlign="left"
          cursor={event ? "pointer" : "default"}
        >
          <Heading
            fontSize="2xl"
            as="b"
            color={useColorModeValue("teal", "teal")}
          >
            {event ? `${event.name}` : 'Artemoted'}
          </Heading>
        </Box>
        <Box hidden={event && isOpen} >
          <ColorModeSwitcher/>
        </Box>
      </Box>
      {event && <EventNavbarDrawer isOpen={isOpen} onClose={onClose} event={event}/>}
    </Box>
  )
}


export default NavBar;
