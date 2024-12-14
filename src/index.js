
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import SignUp from './Components/SignUp';
import Signin from './Components/Signin';
import Nav from './Components/Nav';
import AddParfumForm from './Components/Ajouterparfum';
import { PanierProvider } from './Components/PanierContext';
import MonPanier from './Components/MonPanier';
import Showparfum from './Components/Showparfum';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PanierProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/ajouterprod' element={<AddParfumForm />} />
          <Route path='/panier' element={<MonPanier />} />
          <Route path="/parfums/:id" element={<Showparfum/>} />
        </Routes>
      </BrowserRouter>
    </PanierProvider>
  </React.StrictMode>
);
