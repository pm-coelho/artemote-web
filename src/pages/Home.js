import React, {useEffect, useState} from 'react';
import { Box } from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import ArtworkCard from '../components/ArtworkCard';

const Home = () => {
  const [artworks, setArtworks] = useState([])
  const {client} = useAuth();

  useEffect(() => {
    !artworks && client.artworks.list()
      .then(res=> setArtworks(res))
  }, [artworks, client])

  return (
    <Layout>
      <Box maxW="688px">
        {artworks.map(artwork => (
          <ArtworkCard key={artwork.id} base={artwork} mb={12}/>
        ))}
      </Box>
    </Layout>
  );
}

export default Home;
