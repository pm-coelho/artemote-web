import React, { useEffect,useState } from 'react'
import {
  Box,
  Image,
  Badge,
  Divider,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { FaPalette, FaPaintBrush, FaLock, FaLockOpen } from 'react-icons/fa';

import { useAuth } from '../contexts/AuthContext';
import AddEmotionOverlay from './AddEmotionOverlay';
import EmotionsOverlay from './EmotionsOverlay';
import ArtworkDetail from './ArtworkDetail'
import EmotionDetail from './EmotionDetail'


function ArtworkCard({ base, ...props }) {
  const {client} = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStatsUnlocked, setIsStatsUnlocked] = useState(false)
  const [artwork, setArtwork] = useState(base)
  const { id } = useParams()
  const [detailsView, setDetailsView] = useState("details")

  useEffect(() => {
    id &&
      client.artworks.get(id)
      .then(res=> setArtwork(res))
  }, [client, id])

  const handleOverlayToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getDetailsView = (v) => {
    return {
      "details": <ArtworkDetail artwork={artwork} />,
      "emotions": <EmotionDetail artwork={artwork} />
    }[v]
  }

  return (
    <Box
      maxW='2xl'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='xl'
      m={2}
      {...props}
    >
      <Box position="relative"
        align='center'
        alignItems='center'
        display='flex'
        minH={isModalOpen ? '570px' : ''}
        bg={useColorModeValue("gray.100", "gray.700")}
      >
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

      <Box p='3'>
        {isStatsUnlocked &&
         <Box>
           <Box display="flex" justifyContent="space-between" alignItems="baseline">
             <Box
               as='h4'
               noOfLines={1}
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
             >
               {artwork?.artist.username}
             </Box>
           </Box>
           <Divider />
           <Box
             height='270px'
             pt={3}
             pb={3}
             pl={5}
             pr={5}
           >
             {getDetailsView(detailsView)}
           </Box>
           <Divider />
         </Box>
        }

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
          {isStatsUnlocked ? (
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            mr='1'
          >
            <IconButton
              variant='outline'
              colorScheme='gray'
              aria-label='details'
              size='sm'
              icon={<FaPaintBrush/>}
              onClick={() => setDetailsView("details")}
              style={{color: detailsView === "details" ? "teal" : "gray"}}
            />
            <IconButton
              variant='outline'
              colorScheme='gray'
              aria-label='emotions'
              size='sm'
              m={1}
              icon={<FaPalette/>}
              onClick={() => {
                setDetailsView("emotions")
                setIsModalOpen(false)
              }}
              style={{color: detailsView === "emotions" ? "teal" : "gray"}}
            />
          </Box>
          )
           :(
             <Box
               color='gray.500'
               fontWeight='semibold'
               letterSpacing='wide'
               fontSize='xs'
               textTransform='uppercase'
               mr='1'
             >
               <IconButton
                 variant='outline'
                 colorScheme='gray.500'
                 aria-label='Locked details'
                 size='sm'
                 m={1}
                 icon={isModalOpen? <FaLockOpen/> :<FaLock/>}
                 onClick={() => setIsModalOpen(!isModalOpen)}
               />
             </Box>
           )
          }
        </Box>

      </Box>
    </Box>
  )
}

export default ArtworkCard
