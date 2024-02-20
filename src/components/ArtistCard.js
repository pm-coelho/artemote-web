import React from 'react'
import {
  Center,
  Box,
  Tooltip,
  IconButton,
  Divider,
  Avatar,
  WrapItem,
  Text
} from '@chakra-ui/react'
import {
  RiUser3Line,
  RiMap2Line,
  RiArtboardLine,
  RiPinDistanceLine,
  RiChat1Line
} from 'react-icons/ri'


export default function ArtistCard({ artist , ...props}) {
  return (
    <Center pb={5}>
      <Box width="100%">

        <Box>
          <Box px={4} py={2} >
            <WrapItem>
              <Avatar size='2xl' name='Segun Adebayo' src={artist?.photo} />
              <Box pl={5} width="100%"
                textAlign="left"
              >

                <Text>
                  { artist?.firstName } { artist?.lastName }
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  bio
                </Text>
              </Box>
            </WrapItem>
          </Box>
        </Box>


        <Divider p={1}/>

        <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='md'
          textTransform='uppercase'
          mt='1'
          ml='2'
          mr='1'
          display="flex"
          justifyContent="center"
        >
          <Tooltip label="Artworks">
          <IconButton
            variant='link'
            px={2}
            colorScheme='gray'
            aria-label='artworks'
            size='lg'
            icon={<RiArtboardLine/>}
            style={{
              color: "teal",
              fontSize: "2.7em"
            }}
            isRound
          />
        </Tooltip>
          <Tooltip label="Events">
            <IconButton
              px={2}
            variant='link'
            colorScheme='gray'
            aria-label='events'
            size='lg'
            icon={<RiMap2Line />}
            style={{
              color: "gray",
              fontSize: "2.7em"
            }}
            isRound
          />
        </Tooltip>
        <Tooltip label="tours">
          <IconButton
            variant='link'
            px={2}
            colorScheme='gray'
            aria-label='tours'
            size='lg'
            icon={< RiPinDistanceLine />}
            style={{
              color: "gray",
              fontSize: "2.7em"
            }}
            isRound
          />
        </Tooltip>
        <Tooltip label="Chat">
          <IconButton
            variant='link'
            px={2}
            colorScheme='gray'
            aria-label='chat'
            size='lg'
            icon={< RiChat1Line/>}
            style={{
              color: "gray",
              fontSize: "2.7em"
            }}
            isRound
          />
        </Tooltip>
      </Box>
      </Box>
  </Center>

  )
}
