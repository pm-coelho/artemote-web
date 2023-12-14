import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Layout from './components/Layout';
import Artwork from './pages/Artwork';
import Home from './pages/Home';
import Event from './pages/Event';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artworks/:id" element={<Artwork />} />
              <Route path="/events/:id" element={<Event />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
