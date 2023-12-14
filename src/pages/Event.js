import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { Box } from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext';

const Event = () => {
  const [event, setEvent] = useState()
  const {client} = useAuth();
  const { id } = useParams()
  console.log(event)

  useEffect(() => {
    client.events.get(id)
      .then(res=> setEvent(res))
  }, [id, client])

  return (
    <Box maxW="688px">
      AAAA
    </Box>
  );
}

export default Event;
