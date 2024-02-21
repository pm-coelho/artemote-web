import {
  Container,
  Flex,
  Stack,
  Box,
  useColorModeValue,
  Avatar,
  Text
} from '@chakra-ui/react';
import { getFormattedDateRange } from '../utils';
import { useNavigate } from 'react-router-dom'

const EventList = ({ artist }) => {
  const navigate = useNavigate();

  const hoverBg = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('black', 'white');
  const subTextColor = useColorModeValue('gray.400', 'gray.200');

  return (
    <Container w="5xl" >
      {artist?.events?.map((event) => (
        <Box
          key={event.id}
          borderRadius="lg"
          marginY={2}
          w="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          _hover={{ bg: hoverBg }}
          cursor="pointer"
          onClick={() => navigate(`/events/${event.id}/`)}
        >
              <Stack
                spacing={0}
                direction="row"
                alignItems="center"
              >
                <Flex p={4}>
                  <Avatar
                    size="md"
                    name={event.name}
                    src={event.image}
                  />
                </Flex>
                <Flex direction="column" p={2}>
                  <Text
                    color={textColor}
                    fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                    dangerouslySetInnerHTML={{ __html: event.name}}
                  />
                  <Text
                    color={subTextColor}
                    fontSize={{ base: 'sm', sm: 'md' }}
                  >
                    {getFormattedDateRange(event.startDate, event.endDate)}
                  </Text>
                </Flex>
              </Stack>
          </Box>
        ))}
    </Container>
  );
};

export default EventList;
