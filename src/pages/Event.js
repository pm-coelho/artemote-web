import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { Box } from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext';

import Layout from '../components/Layout';
import ArtworkCard from '../components/ArtworkCard';

const Event = () => {
  const [event, setEvent] = useState()
  const {client} = useAuth();
  const { id } = useParams()

  useEffect(() => {
    client.events.get(id)
      .then(res=> setEvent(res))
  }, [id, client])

  return (
    <Layout event={event}>
      <Box maxW="688px">
        {event && event.artworks.map(artwork => (
          <ArtworkCard key={artwork.id} base={artwork} mb={12}/>
        ))}
      </Box>
    </Layout>
  );
}

export default Event;
