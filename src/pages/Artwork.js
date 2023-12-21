import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { Box } from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext';

import Layout from '../components/Layout';
import ArtworkCard from '../components/ArtworkCard';

const Artwork = () => {
  const [artwork, setArtwork] = useState([])
  const {client} = useAuth();
  const { id } = useParams()

  useEffect(() => {
    id && client.artworks.get(id)
      .then(res=> setArtwork(res))
  }, [id, client])

  return (
    <Layout>
      <Box maxW="688px">
        <ArtworkCard base={artwork}/>
      </Box>
    </Layout>
  );
}

export default Artwork;
