import React from 'react'
import { Route } from 'react-router';
import { Routes, BrowserRouter } from 'react-router-dom';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { NotFound } from './components/NotFound';

export const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} exact path="/login" />
        <Route element={<Register />} exact path="/Register" />
        <Route element={<Home />} exact path="/" />
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}