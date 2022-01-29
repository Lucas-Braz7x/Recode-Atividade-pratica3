import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header, Footer, Container } from './layout';
import './styles/Global.css';
import { Destino } from './pages/Destino';

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Destino />} path="/destino" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Container>
  )
}

export default App;
