import React from 'react';

import {
  Box,
  useColorModeValue,
  IconButton,
  DrawerContent,
  DrawerFooter,
  Drawer,
  DrawerOverlay,
} from '@chakra-ui/react';
import {
  RiMapPin2Line,
  RiFileList2Line,
  RiUser3Line,
  RiGalleryLine,
} from "react-icons/ri";

import EventNavbarDrawerDescriptionContent from './EventNavbarDrawerDescriptionContent';
import EventNavbarDrawerLocationContent from './EventNavbarDrawerLocationContent';

const EventNavbarDrawer = ({isOpen, onClose, event}) => {
  const [content, setContent] = React.useState("description");

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

  const getContent = (content) => {
    return {
      "description": <EventNavbarDrawerDescriptionContent event={event}/>,
      "location": <EventNavbarDrawerLocationContent event={event}/>,
    }[content]
  }

  return (
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
        {getContent(content)}

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
              aria-label='description'
              size='lg'
              icon={<RiFileList2Line/>}
              style={{
                color: content === "description" ? "teal" : "gray",
                fontSize: "2.7em"
              }}
              onClick={() => setContent("description")}
              isRound
            />
            <IconButton
              variant='link'
              colorScheme='gray'
              aria-label='artworks'
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
              aria-label='artist'
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
              aria-label='location'
              size='lg'
              icon={<RiMapPin2Line/>}
              style={{
                color: content === "location" ? "teal" : "gray",
                fontSize: "2.7em"
              }}
              onClick={() => setContent("location")}
              isRound
            />
          </Box >
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default EventNavbarDrawer;
