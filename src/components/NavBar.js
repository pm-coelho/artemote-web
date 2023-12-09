import React from 'react';
import {
  Box,
  Heading,
  Link,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const NavBar = () => {
  return (
    <Box width="100%" boxShadow="sm">
      <Box display="flex" justifyContent="space-between" width="100%" p={2} >
        <Link to="/" >
          <Heading fontSize="3xl" as="b" color="teal.400" >
            Artemote
          </Heading>
        </Link>
        <ColorModeSwitcher/>
      </Box>
    </Box>
  )
}


export default NavBar;
