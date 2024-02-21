import React, {useEffect, useState} from 'react';
import {
  Box,
  Tooltip,
  IconButton,

} from '@chakra-ui/react';
import { RiRefreshFill } from "react-icons/ri";

import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import ArtworkCard from '../components/ArtworkCard';

const Home = () => {
  const [artwork, setArtwork] = useState({})
  const {client} = useAuth();

  useEffect(() => {
    if (!artwork?.id){
      client.artworks.getRandom()
        .then(res=> setArtwork(res))
        .catch(console.log)
    }
  }, [artwork, client])

  const randomizeArtwork= () => {
    client.artworks.getRandom()
      .then(res=> setArtwork(res))
      .catch(console.log)
  }


  return (
    <Layout>
      <Box maxW="688px">
        <ArtworkCard key={artwork.id} base={artwork} mb={2}/>
      </Box>

      <Tooltip label="Get a new Artwork!">
        <IconButton
          variant='link'
          colorScheme='gray'
          aria-label='artworks'
          size='5xl'
          icon={<RiRefreshFill/>}
          style={{
            color: "#2a4365",
            fontSize: "4em"
          }}
          isRound
          onClick={randomizeArtwork}
        />
      </Tooltip>
    </Layout>
  );
}

export default Home;
