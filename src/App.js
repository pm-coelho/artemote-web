import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Home from './components/Home';
import Layout from './components/Layout';
import ArtworkCard from './components/ArtworkCard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artworks/:id" element={<ArtworkCard />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
