import React from 'react'
import {
  Center,
} from '@chakra-ui/react'


export default function ArtistCard({ artist , ...props}) {
  return (
  <Center py={10}>
    {artist?.username} artist page.
  </Center>

  )
}
