import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Passagens, Viagem } from './pages';
import { Header, Footer, Container, Content } from './layout';
import './styles/Global.css';

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Header />
        <Content>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Viagem />} path="/viagem" />
            <Route element={<Passagens />} path="/passagens" />
          </Routes>
        </Content>
        <Footer />
      </BrowserRouter>
    </Container>
  )
}

export default App;
