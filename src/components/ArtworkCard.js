import React, { useEffect,useState } from 'react'
import {
  Box,
  Image,
  Badge,
  Divider,
  IconButton,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import {
  RiBrushLine,
  RiPaletteLine,
  RiImage2Line,
  RiLockFill,
  RiLockUnlockFill
} from "react-icons/ri";

import { useAuth } from '../contexts/AuthContext';
import EmotionsOverlay from './EmotionsOverlay';
import ArtDetailsOverlay from './ArtDetailsOverlay'


function ArtworkCard({ base, ...props }) {
  const {client} = useAuth();

  const [isOverlayActive, setIsOverlayOpen] = useState(false)
  const [artwork, setArtwork] = useState(base)
  const { id } = useParams()
  const [artworkOverlay, setArtworkOverlay] = useState(null)
  const [isLocked, setIsLocked] = useState(true)

  useEffect(() => {
    id &&
      client.artworks.get(id)
      .then(res=> setArtwork(res))
  }, [client, id])

  const handleOverlayToggle = () => {
    setIsOverlayOpen(!isOverlayActive);
    setArtworkOverlay(artworkOverlay === null ? "emotions" : null)
  };

  const getOverlay = (o) => {
    return {
      "details": <ArtDetailsOverlay artwork={artwork}/>,
      "emotions": <EmotionsOverlay
          artwork={artwork}
          setArtwork={setArtwork}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
      />
    }[o]
  }

  return (
    <Box
      maxW='2xl'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='xl'
      m={1}
      {...props}
    >
      <Box position="relative"
        align='center'
        alignItems='center'
        display='flex'
        bg={useColorModeValue("gray.100", "gray.700")}
      >
        <Image
          src={artwork?.photo}
          alt="Sample Image"
          objectFit="cover"
          onClick={handleOverlayToggle}
        />
          <Box
            onClick={handleOverlayToggle}
            minH={artworkOverlay ? "570px" : "0"}
          >
            {artworkOverlay && getOverlay(artworkOverlay)}
          </Box>
      </Box>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            mt='1'
            ml='2'
            mr='1'
            display="flex"
          >
            <Tooltip label="Artwork">
            <IconButton
              variant='link'
              colorScheme='gray'
              aria-label='details'
              size='lg'
              icon={<RiImage2Line/>}
              onClick={() => setArtworkOverlay(null)}
              style={{
                color: artworkOverlay === null ? "teal" : "gray",
                fontSize: "2.7em"
              }}
              isRound
            />
            </Tooltip>
            <Tooltip label="Emotions">
            <IconButton
              variant='link'
              colorScheme='gray'
              aria-label='emotions'
              size='lg'
              m={1}
              icon={< RiPaletteLine />}
              onClick={() => {
                setArtworkOverlay(artworkOverlay === "emotions" ? null : "emotions")
              }}
              style={{
                color: artworkOverlay === "emotions" ? "teal" : "gray",
                fontSize: "2.7em"
              }}
              isRound
              h="50"
              w="50"
            />
            </Tooltip>
            <Tooltip label="Artwork Details">
            <IconButton
              variant='link'
              colorScheme='gray'
              size='lg'
              icon={isLocked ? <RiLockFill/> : <RiBrushLine/>}
              onClick={() =>
                setArtworkOverlay(artworkOverlay === "details" ? null : "details")
              }
              style={{
                color: artworkOverlay === "details" ? "teal" : "gray",
                fontSize: "2.7em"
              }}
              isRound
              isDisabled={isLocked}
            />
            </Tooltip>
          </Box>
           <Divider />

      <Box p='3'>
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
             >
               <IconButton
                 variant='link'
                 cursor='pointer'
                 colorScheme='gray.500'
                 aria-label='Locked details'
                 size='md'
                 m={1}
                 icon={ isLocked ?  <RiLockFill/> : <RiLockUnlockFill/>}
               />
             </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default ArtworkCard
