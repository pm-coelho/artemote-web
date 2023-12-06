import React, {useState} from 'react';

import {
  InputGroup,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { FaPalette } from 'react-icons/fa';

import client from '../services/artfeelzClient';


const AddEmotionForm = ({ artwork, setArtwork, setIsStatsUnlocked, ...props }) => {
  const [emotion, setEmotion] = useState("")

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
            setEmotion("")
            setArtwork(res)
            setIsStatsUnlocked(true)
          })
      })
  }

  return (
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
          value={emotion}
          {...props}
        />
        <IconButton
          variant='outline'
          size='lg'
          icon={<FaPalette/>}
          ml={5}
          onClick={handleEmotionSubmit}
        />
      </InputGroup>
  )
}

export default AddEmotionForm;
