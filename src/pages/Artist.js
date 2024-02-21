import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Center,
  Tooltip,
  IconButton,
  Divider,
  Avatar,
  WrapItem,
  Text
} from '@chakra-ui/react';
import {
  RiMap2Line,
  RiArtboardLine,
  RiPinDistanceLine,
  RiChat1Line,
  RiShoppingCartLine,
} from 'react-icons/ri'


import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import ArtworkCard from '../components/ArtworkCard';
import EventList from '../components/EventList';

const ArtistPage = () => {
  const [ artist , setArtist ] = useState({})
  const [ pickedContent, setPickedContent ] = useState("artworks")

  const { client } = useAuth();
  const { username } = useParams();

  useEffect(() => {
    if (!artist?.id){
      client.artists.get(username)
        .then(res=> setArtist(res))
        .catch(console.log)
    }
  }, [username, artist, client])

  const getContent = (o) => {
    return {
      "artworks": artist?.artworks?.map(artwork => {
          artwork.artist = artist;
          return <ArtworkCard key={artwork.id} base={artwork} mb={12} />
      }),
      "events": <EventList artist={artist}/>
    }[o]
  }

  return (
    <Layout artist={artist}>
      <Box width="90%" maxW="688px">
        <Center pb={5}>
          <Box width="100%">
            <Box>
              <Box px={4} py={2} >
                <WrapItem>
                  <Avatar size='2xl' src={artist?.photo} />
                  <Box pl={5} width="100%"
                    textAlign="left"
                  >
                    <Text>
                      { artist?.firstName } { artist?.lastName }
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      { artist?.bio }
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
                    color: pickedContent === "artworks" ? "teal" : "gray",
                    fontSize: "2.7em"
                  }}
                  isRound
                  onClick={() => setPickedContent("artworks")}
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
                    color: pickedContent === "events" ? "teal" : "gray",
                    fontSize: "2.7em"
                  }}
                  isRound
                  onClick={() => setPickedContent("events")}
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
              <Tooltip label="Shop">
                <IconButton
                  variant='link'
                  px={2}
                  colorScheme='gray'
                  aria-label='chat'
                  size='lg'
                  icon={<RiShoppingCartLine/>}
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
      </Box>
      <Box maxW="688px">
        {getContent(pickedContent)}
      </Box>
    </Layout>
  );
}

export default ArtistPage;
