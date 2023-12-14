import React, {useEffect, useState} from 'react';
import { Box } from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext';
import ArtworkCard from '../components/ArtworkCard';

const Home = () => {
  const [artworks, setArtworks] = useState([])
  const {client} = useAuth();

  useEffect(() => {
    client.artworks.list()
      .then(res=> setArtworks(res))
  }, [client])

  return (
    <Box maxW="688px">
      {artworks.map(artwork => (
        <ArtworkCard key={artwork.id} base={artwork} mb={12}/>
      ))}
    </Box>
  );
}

export default Home;
