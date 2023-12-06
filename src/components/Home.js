import React, {useEffect, useState} from 'react';
import { Box } from '@chakra-ui/react';

import ArtworkCard from './ArtworkCard';
import client from '../services/artfeelzClient';

const Home = () => {
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    client({
      apiUrl: "http://localhost:8000/api",
    }).artworks.list()
      .then(res=> setArtworks(res))
  }, [])

    return (
      <Box>
        {artworks.map(artwork => (
          <ArtworkCard key={artwork.id} base={artwork} mb={12}/>
        ))}
      </Box>
    );
}

export default Home;
