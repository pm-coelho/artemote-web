import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import ArtworkCard from '../components/ArtworkCard';
import ArtistCard from '../components/ArtistCard';

const ArtistPage = () => {
  const [artist, setArtist] = useState({})

  const {client} = useAuth();
  const { username } = useParams();

  useEffect(() => {
    if (!artist?.id){
      client.artists.get(username)
        .then(res=> setArtist(res))
        .catch(console.log)
    }
  }, [username, artist, client])

  return (
    <Layout artist={artist}>
      <Box width="90%">
        <ArtistCard artist={artist}/>
      </Box>
      <Box maxW="688px">
        {artist?.artworks?.map(artwork => {
          artwork.artist = artist;
          return <ArtworkCard key={artwork.id} base={artwork} mb={12}/>
        })}
      </Box>
    </Layout>
  );
}

export default ArtistPage;
