import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';
import L from 'leaflet'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'


const UpdateMap = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, map.getZoom());
    }
  }, [location, map]);

  return null;
};

const EventNavbarDrawerLocationContent = ({event}) => {
  const [address, setAddress] = useState('Loading address...');

  useEffect(() => {
    if (event && event.location) {
      const geocodeLatLng = async () => {
        // Construct URL for the Nominatim API
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${event.location[0]}&lon=${event.location[1]}`;

        try {
          const response = await axios.get(apiUrl, {
            // headers: { 'User-Agent': 'YourApp/1.0 (youremail@example.com)' }  // Replace with your app and contact info
          });
          if (response.data) {
            console.log(response.data.address);
            setAddress(response.data.address)
          } else {
            setAddress('Address not found');
          }
        } catch (error) {
          console.error('Error in reverse geocoding:', error);
          setAddress('Error retrieving address');
        }
      };

      if (event.location[0] && event.location[1]) {
        geocodeLatLng();
      }
    }
  }, [event]);








  return (
    <Box >
      <Box
        width="50%"
        height="400px"
        float="right"
      >
        {event?.location &&
         <MapContainer
           center={event.location}
           zoom={13}
           style={{ height: '400px', width: '100%' }}
         >
           <TileLayer
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           />
           <Marker position={event.location}
                   icon={new L.Icon({
                     iconUrl: require('leaflet/dist/images/marker-icon.png'),
                     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
                     iconSize: [25, 41],
                     iconAnchor: [10, 41],
                     popupAnchor: [2, -40],
                     shadowSize: [41, 41]
                   })}
           >
             <Popup>
               {event.name} <br /> 
             </Popup>
           </Marker>
           <UpdateMap location={event.location}/>
         </MapContainer>
        }
      </Box>
      {event &&
       <Box
         mt="10px"
         ml="10px"
       >
         <Text>
           {/* {address.city} */}
          {/* {address.city_district} */}
          {/* {address.county} */}
          {/* {address.state} */}
          {/* {address.country} */}
          {/* {address.postcode} */}
          {/* {address.road} */}
          {/* {address.house_number} */}
          {/* {address.suburb} */}
          {/* this information is formated as a tipical Adress display*/}
          {`${address.road} ${address.house_number}, ${address.city}`}
        </Text>
        <Text>
          {`${address.city_district} ${address.postcode}, ${address.country}`}
        </Text>
       </Box>
      }
    </Box>
  );
}

export default EventNavbarDrawerLocationContent;
