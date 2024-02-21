import React, { useEffect,useState } from 'react'
import {
  Box,
  Image,
  Badge,
  Divider,
  IconButton,
  Tooltip,
  useColorModeValue,
  Avatar,
  Text,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {
  RiBrushLine,
  RiPaletteLine,
  RiImage2Line,
  RiLockFill,
  RiBubbleChartLine,
  RiBubbleChartFill,
  RiCalendarEventLine,
  RiMapPin2Line,
  RiMessage2Line,
  RiMailSendLine,
  RiShoppingBag3Line
} from "react-icons/ri";

import { useAuth } from '../contexts/AuthContext';
import EmotionsOverlay from './EmotionsOverlay';
import ArtDetailsOverlay from './ArtDetailsOverlay'


function ArtworkCard({ base, ...props }) {
  const {client} = useAuth();
  const navigate = useNavigate();

  const { id } = useParams()
  const [isOverlayActive, setIsOverlayOpen] = useState(false)
  const [artwork, setArtwork] = useState(base)
  const [artworkOverlay, setArtworkOverlay] = useState(null)
  const [isLocked, setIsLocked] = useState(true)

  useEffect(() => {
    if (base) {
      setArtwork(base)
    } else {
      client.artworks.get(id).then(setArtwork).catch(console.log)
    }
  }, [base, client, id])

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

  const getUserLink = () => {
    return (
      <Box
        display="flex"
        alignItems="center"
        cursor="pointer"
        onClick={() => navigate(`/artists/${artwork?.artist?.username}`)}
      >
        <Text pr={2}> {artwork?.artist?.username} </Text>
        <Avatar src={artwork?.artist?.photo} />
      </Box>
    )
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
          alt={artwork?.title || "Artwork" }
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
      <Box display='flex' justifyContent='space-between'
      >
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
        <Tooltip label="Description">
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

        <Tooltip label="Events">
        <IconButton
          variant='link'
          colorScheme='gray'
          size='lg'
          icon={isLocked ? <RiLockFill/> : <RiCalendarEventLine/>}
          onClick={() =>console.log("Events not implemented")}
          style={{
            color: artworkOverlay === "details" ? "teal" : "gray",
            fontSize: "2.7em"
          }}
          isRound
          isDisabled={true}
        />
        </Tooltip>

        <Tooltip label="Location">
        <IconButton
          variant='link'
          colorScheme='gray'
          size='lg'
          icon={isLocked ? <RiLockFill/> : <RiMapPin2Line/>}
          onClick={() =>console.log("Location not implemented")}
          style={{
            color: artworkOverlay === "details" ? "teal" : "gray",
            fontSize: "2.7em"
          }}
          isRound
          isDisabled={true}
        />
        </Tooltip>
        <Tooltip label="Comments">
          <IconButton
            variant='link'
            colorScheme='gray'
            size='lg'
            icon={isLocked ? <RiLockFill/> : <RiMessage2Line/>}
            onClick={() =>console.log("Comments not implemented")}
            style={{
              color: artworkOverlay === "comments" ? "teal" : "gray",
              fontSize: "2.7em"
            }}
            isRound
            isDisabled={true}
          />
        </Tooltip>
        <Tooltip label="Get in touch">
        <IconButton
          variant='link'
          colorScheme='gray'
          size='lg'
          icon={isLocked ? <RiLockFill/> : <RiMailSendLine/>}
          onClick={() =>console.log("Get in touch not implemented")}
          style={{
            color: artworkOverlay === "getInTouch" ? "teal" : "gray",
            fontSize: "2.7em"
          }}
          isRound
          isDisabled={true}
        />
        </Tooltip>
        <Tooltip label="Shop">
        <IconButton
          variant='link'
          colorScheme='gray'
          size='lg'
          icon={isLocked ? <RiLockFill/> : <RiShoppingBag3Line/>}
          onClick={() =>console.log("Shop not implemented")}
          style={{
            color: artworkOverlay === "shop" ? "teal" : "gray",
            fontSize: "2.7em"
          }}
          isRound
          isDisabled={true}
        />
        </Tooltip>

      </Box >
        <Box
          color='gray'
          fontWeight='semibold'
          letterSpacing='wide'
          display='flex'
          fontSize='xl'
          textTransform='Capitalize'
          mt='1'
          ml='2'
          mr='2'
          py='1'
          alignItems="center"
        >
          {!isLocked && getUserLink()}

        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        mx='10'
      >
        <Divider />
      </Box>
      <Box p='2' pb='2' pt='0'>
        <Box display='flex' justifyContent='space-between' alignItems='baseline'>
          <Box display='flex' alignItems='baseline'>
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
              {artwork?.emotions?.reduce((a, b) => a + b.count, 0)} reactions
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
                 color={isLocked ? 'gray' : 'gray.200'}
                 size='xs'
                 fontSize="xs"
                 onClick={() => setArtworkOverlay("emotions")}
                 style={{fontSize: "1.4em"}}
                 mt={1}
                 icon={ isLocked ?  <RiBubbleChartLine/> : <RiBubbleChartFill/>}
                 isRound
               />
             </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default ArtworkCard
