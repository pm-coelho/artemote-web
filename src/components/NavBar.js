import React from 'react';
import {
  Box,
  Heading,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
  Image,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
  RiMapPin2Line,
  RiFileList2Line,
  RiUser3Line,
  RiGalleryLine,
} from "react-icons/ri";


const NavBar = ({ artwork, event }) => {
  const { isOpen, onOpen, onClose} = useDisclosure()

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formatDate = (date, includeYear) => {
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = `'${date.getUTCFullYear().toString().substr(-2)}`;
    return includeYear ? `${day} ${month} ${year}` : `${day} ${month}`;
  };

  const getFormattedDateRange = (ev) => {
    const start = ev.startDate ? new Date(ev.startDate) : null;
    const end = ev.endDate ? new Date(ev.endDate) : null;
    const today = new Date();

    let fullString = ""

    if (start && start >= today) {
      const formattedStartDate = formatDate(
        start,
        today.getUTCFullYear() !== start.getUTCFullYear()
      );
      fullString += `${formattedStartDate} - `;
    } else {
      fullString += "Ongoing - ";
    }

    if (end) {
      const formattedEndDate = formatDate(
        end,
        today.getUTCFullYear() !== end.getUTCFullYear()
      );
      fullString += `${formattedEndDate}`;
    }

    return fullString;
  };

  return (
    <Box
      as="nav"
      width="100%"
      boxShadow="lg"
      position="sticky"
      top="0"
      zIndex="sticky"
      alignItems="center"
      backgroundColor={useColorModeValue("white", "gray.800")}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        p={2}
        alignItems="center"
        maxH="50"
      >
        <Box
          onClick={onOpen}
          width="90%"
          textAlign="left"
        >
          <Link pt={1} to="/" >
            <Heading
              fontSize="2xl"
              as="b"
              color={useColorModeValue("teal", "teal")}
            >
              {event ? `${event.name}` : 'Artemoted'}
            </Heading>
          </Link>
        </Box>
        <Box hidden={isOpen} >
          <ColorModeSwitcher/>
        </Box>
      </Box>
      <Drawer
        placement="top"
        onClose={onClose}
        isOpen={isOpen}
        size="lg"
        autoFocus={false}
      >
         <DrawerOverlay marginTop="49" />
         <DrawerContent
           backgroundColor={useColorModeValue("white", "gray.800")}
           marginTop="49"
           overflowY="scroll"
           size="sm"
           p="20px"
         >
           <Box>
             <Image
               src={event?.image}
               float="right"
               width="35%"
               alt="Event Image"
               ml="10px"
                mb="10px"
             />
             {event?.description.split("\n").map((line, i ) => 
                   <Text
                     key={i}
                     mt='1'
                     color='gray.500'
                     fontSize='sm'
                     noOfLines={40}
                     textAlign="left"
                   >
                     {line}
                   </Text>
                 )}
           </Box>
           <DrawerFooter
             display="flex"
             justifyContent="space-between"
           >

             <Box
               color='gray'
               fontWeight='semibold'
               letterSpacing='wide'
               fontSize='xl'
               textTransform='Capitalize'
               display="flex"
               alignItems="center"
             >
               {event && getFormattedDateRange(event)}
             </Box>
             <Box
               color='gray.500'
               fontWeight='semibold'
               letterSpacing='wide'
               fontSize='xs'
               textTransform='uppercase'
             >
               <IconButton
                 variant='link'
                 colorScheme='gray'
                 aria-label='details'
                 size='lg'
                 icon={<RiFileList2Line/>}
                 style={{
                   color: "teal", // artworkOverlay === null ? "teal" : "gray",
                   fontSize: "2.7em"
                 }}
                 isRound
               />
               <IconButton
                 variant='link'
                 colorScheme='gray'
                 aria-label='details'
                 size='lg'
                 icon={<RiGalleryLine/>}
                 style={{
                   color: "gray", // artworkOverlay === null ? "teal" : "gray",
                   fontSize: "2.7em"
                 }}
                 isDisabled
                 isRound
               />
               <IconButton
                 variant='link'
                 colorScheme='gray'
                 aria-label='details'
                 size='lg'
                 icon={<RiUser3Line/>}
                 style={{
                   color: "gray", // artworkOverlay === null ? "teal" : "gray",
                   fontSize: "2.7em"
                 }}
                 isDisabled
                 isRound
               />
               <IconButton
                 variant='link'
                 colorScheme='gray'
                 aria-label='details'
                 size='lg'
                 icon={<RiMapPin2Line/>}
                 style={{
                   color: "gray", // artworkOverlay === null ? "teal" : "gray",
                   fontSize: "2.7em"
                 }}
                 isDisabled
                 isRound
               />
             </Box >
           </DrawerFooter>
         </DrawerContent>
      </Drawer>
    </Box>
  )
}


export default NavBar;
