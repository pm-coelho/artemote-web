import React, { useEffect,useState } from 'react'
import {
  Box,
  Image,
  Badge,
  Divider,
  Highlight,
  Heading,
  InputGroup,
  Text,
  Input,
  IconButton,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import client from '../services/artfeelzClient';
import EmotionsChart from './EmotionsChart';
import { FaPalette, FaPaintBrush } from 'react-icons/fa';


function ArtworkCard({ base, ...props }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [artwork, setArtwork] = useState(base)
  const { id } = useParams()
  const [emotion, setEmotion] = useState(null)

  useEffect(() => {
    id &&
    client({
      apiUrl: "http://localhost:8000/api",
    }).artworks.get(id)
      .then(res=> setArtwork(res))
  }, [id])

  const handleOverlayToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEmotionChange = (e) => {
    setEmotion(e.target.value)
  }

  return (
    <Box
      maxW='2xl'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='xl'
      m={5}
      {...props}
    >

      <Box position="relative">
        <Image src={artwork?.photo} alt="Sample Image" objectFit="cover"
               onClick={handleOverlayToggle}
        />
        {isModalOpen&& (
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundColor="rgba(0, 0, 0, 0.7)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            p={10}
            onClick={handleOverlayToggle}
          >
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
            <InputGroup w="70%" mt={5}
                        onClick={e => e.stopPropagation()}
            >
              <Input
                size="lg"
                variant="flushed"
                placeholder='Warmth'
                align='center'
                pl={5}
                pr={10}
                overflowX='auto'
                borderColor='white'
                onChange={e => handleEmotionChange(e)}
                fontSize='4xl'
              />
            </InputGroup>
            <EmotionsChart data={artwork?.emotions} />
          </Box>
        )}
      </Box>

      <Box p='6'>
        <Box display="flex" justifyContent="space-between" alignItems="baseline">
          <Box
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
            pl={5}
          >
            {artwork?.title}
          </Box>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            pr={5}
          >
            {artwork?.artist.username}
          </Box>
        </Box>
        <Divider />
        <Box
          overflowY='auto'
          maxH='300px'
          pt={3}
          pl={5}
          pr={5}
          textAlign="left"
        >
          {artwork?.description.split("\n").map((line, i ) => 
            <Text
              key={i}
              mt='1'
              color='gray.300'
              fontSize='sm'
              noOfLines={40}
            >
              {line}
            </Text>
          )}
        </Box>
        <Divider />
        <Box display='flex' justifyContent='space-between' alignItems='baseline'>
          <Box display='flex' alignItems='baseline' mt="2">
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              24 reactions
            </Box>
          </Box>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            mr='1'
            pr={4}
          >
            <IconButton
              variant='outline'
              colorScheme='gray'
              aria-label='Call Sage'
              size='sm'
              icon={<FaPaintBrush/>}
            />
            <IconButton
              variant='outline'
              colorScheme='gray'
              aria-label='Call Sage'
              size='sm'
              m={1}
              icon={<FaPalette/>}
            />
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default ArtworkCard
