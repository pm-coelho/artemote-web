import React, {useState} from 'react';

import {
  Heading,
  Text,
  InputGroup,
  Input,
  IconButton,
  Highlight,
} from '@chakra-ui/react';
import { FaPalette } from 'react-icons/fa';

import client from '../services/artfeelzClient';
import ArtworkOverlay from './ArtworkOverlay';


const AddEmotionForm = ({ artwork, setArtwork, setIsStatsUnlocked }) => {
  const [emotion, setEmotion] = useState(null)

  const handleEmotionChange = (e) => {
    setEmotion(e.target.value)
  }

  const handleEmotionSubmit = (e) => {
    client({
      apiUrl: "http://localhost:8000/api",
    }).artworks.addEmotion(artwork?.id, emotion)
      .then(res => {
        client({
          apiUrl: "http://localhost:8000/api",
        }).artworks.get(artwork?.id)
          .then(res=> {
            setArtwork(res)
            setEmotion(null)
            setIsStatsUnlocked(true)
          })
      })
  }

  return (
    <ArtworkOverlay >
      <Heading
        lineHeight='tall'
        color='white'
      >
        <Highlight
          query='you feel'
          styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal' }}
        >
          Tell us what you feel when you look at this artwork
        </Highlight>
      </Heading>
      <Text fontSize="sm" width="70%"
            color='white'
      >
        Take a moment to reflect on the artwork and write a one word
        description of how it makes you feel.
      </Text>
      <InputGroup
        w="70%"
        mt={5}
        onClick={e => e.stopPropagation()}
      >
        <Input
          size="lg"
          variant="flushed"
          placeholder=''
          align='center'
          pl={5}
          pr={10}
          overflowX='auto'
          borderColor='white'
          onChange={e => handleEmotionChange(e)}
          fontSize='4xl'
        />
        <IconButton
          variant='outline'
          size='lg'
          icon={<FaPalette/>}
          ml={5}
          onClick={handleEmotionSubmit}
        />
      </InputGroup>
    </ArtworkOverlay>
  )
}

export default AddEmotionForm;
