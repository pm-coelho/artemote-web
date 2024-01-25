import React from 'react';
import {
  Box,
  Text,
  Heading,
  useColorModeValue,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {RiArrowLeftCircleLine} from 'react-icons/ri';

import EventNavbarDrawer from './EventNavbarDrawer';

const NavBar = ({ artwork, event, artist }) => {
  const { isOpen, onOpen, onClose} = useDisclosure()

  const getTitle = () => {
    let name = "Your Art Gallery"
    if (artwork) name = artwork.name;
    if (event) name = event.name;
    if (artist) name = artist.username;
    return name
  }

  return (
    <Box
      as="nav"
      width="100%"
      boxShadow="lg"
      position="sticky"
      top="0"
      zIndex="sticky"
      alignItems="baseline"
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
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='md'
            textTransform='uppercase'
            pt={2}
          >
            <IconButton
              variant='link'
              aria-label='description'
              icon={<RiArrowLeftCircleLine />}
              style={{
                color: "#234E52",
                fontSize: "2.7em"
              }}
              isRound
            />
        </Box>

        <Box
          onClick={event ? onOpen : () => {}}
          width="90%"
          textAlign="left"
          cursor={event ? "pointer" : "default"}
          display="flex"
          alignItems="baseline"
          bottom="0"
          pl={3}
        >
          <Heading
            fontSize="2xl"
            as="b"
            color={useColorModeValue("teal", "teal")}
            pt={2}
          >
            {getTitle()}
          </Heading>
          <Box
            display="flex"
            alignItems="center"
          >
            <Text
              color={useColorModeValue("gray.700", "gray.300")}
              fontSize="sm"
              pl={2}
            >
              artemoted
            </Text>
            <Text
              color={useColorModeValue("gray.700", "gray.300")}
              fontSize="xs"
              pl="2px"
            >
              ®
            </Text>
          </Box>
        </Box>
        <Box hidden={(event || artwork || artist) && isOpen} >
          <ColorModeSwitcher/>
        </Box>
      </Box>
      {event && <EventNavbarDrawer isOpen={isOpen} onClose={onClose} event={event}/>}
    </Box>
  )
}


export default NavBar;
