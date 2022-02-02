import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Destino } from './pages';
import { Header, Footer, Container } from './layout';
import './styles/Global.css';

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
