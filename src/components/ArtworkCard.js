import React, { useEffect,useState } from 'react'
import {
  Box,
  Image,
  Badge,
  Divider,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { FaPalette, FaPaintBrush } from 'react-icons/fa';

import client from '../services/artfeelzClient';

import AddEmotionOverlay from './AddEmotionOverlay';
import EmotionsOverlay from './EmotionsOverlay';


function ArtworkCard({ base, ...props }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStatsUnlocked, setIsStatsUnlocked] = useState(false)
  const [artwork, setArtwork] = useState(base)
  const { id } = useParams()

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
        <Image
          src={artwork?.photo}
          alt="Sample Image"
          objectFit="cover"
          onClick={handleOverlayToggle}
        />
        {isModalOpen && (
          <Box
            onClick={handleOverlayToggle}
          >
            { isStatsUnlocked ? (
              <EmotionsOverlay
                artwork={artwork}
                setArtwork={setArtwork}
                setIsStatsUnlocked={setIsStatsUnlocked} />
            ) : (
              <AddEmotionOverlay 
                artwork={artwork}
                setArtwork={setArtwork}
                setIsStatsUnlocked={setIsStatsUnlocked} />
            )}
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
              {artwork?.emotions.reduce((a, b) => a + b.count, 0)} reactions
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
