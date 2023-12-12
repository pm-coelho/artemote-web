import React, {useState} from 'react';

import {
  InputGroup,
  Input,
} from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext';


const AddEmotionForm = ({ artwork, setArtwork, setIsLocked, ...props }) => {
  const {client} = useAuth();
  const [emotion, setEmotion] = useState("")

  const handleEmotionChange = (e) => {
    setEmotion(e.target.value)
  }

  const handleEmotionSubmit = (e) => {
    client.artworks.addEmotion(artwork?.id, emotion)
      .then(res => {
        client.artworks.get(artwork?.id)
          .then(res=> {
            setEmotion("")
            setArtwork(res)
            setIsLocked(false)
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
          color="white"
          placeholder=''
          align='center'
          pl={5}
          overflowX='auto'
          borderColor='white'
          onChange={e => handleEmotionChange(e)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              handleEmotionSubmit(e)
            }
          }}
          fontSize='2xl'
          value={emotion}
          {...props}
        />
      </InputGroup>
  )
}

export default AddEmotionForm;
