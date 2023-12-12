import React from 'react';
import {
  Box,
  Heading,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const NavBar = () => {
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
      >
        <Link pt={1} to="/" >
          <Heading
            fontSize="2xl"
            as="b"
            color={useColorModeValue("gray.800", "gray.200")}
          >
            Artemoted
          </Heading>
        </Link>
        <ColorModeSwitcher/>
      </Box>
    </Box>
  )
}


export default NavBar;
