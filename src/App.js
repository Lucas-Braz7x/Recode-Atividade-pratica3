import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Passagens, Usuario, Viagem } from './pages';
import { Header, Footer, Container, Content } from './layout';
import './styles/Global.css';
import { Provider } from 'react-redux';
import { Store } from './store/store';

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Provider store={Store}>
          <Header />
          <Content>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Viagem />} path="/viagem" />
              <Route element={<Passagens />} path="/passagens" />
              <Route element={<Usuario />} path="/usuario" />
            </Routes>
          </Content>
          <Footer />
        </Provider>
      </BrowserRouter>
    </Container>
  )
}

export default App;
