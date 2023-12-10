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
      boxShadow="sm"
      position="sticky"
      top="0" zIndex="sticky"
      py={1}
      backgroundColor={useColorModeValue("white", "gray.800")}
    >
      <Box display="flex" justifyContent="space-between" width="100%" p={2} >
        <Link to="/" >
          <Heading fontSize="3xl" as="b" color="teal.400" >
            Artemoted
          </Heading>
        </Link>
        <ColorModeSwitcher/>
      </Box>
    </Box>
  )
}


export default NavBar;
