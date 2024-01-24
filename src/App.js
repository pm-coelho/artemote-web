import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Artwork from './pages/Artwork';
import Home from './pages/Home';
import Event from './pages/Event';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artworks/:id" element={<Artwork />} />
            <Route path="/events/:id" element={<Event />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
