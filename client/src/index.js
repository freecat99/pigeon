import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router'; 
import App from './App.js';
import Callpage from './pages/Callpage.jsx';
import FourZeroFour from './pages/FourZeroFour.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/call' element={<Callpage/>}/>
      <Route path='*' element={<FourZeroFour/>}/>
    </Routes>
  </BrowserRouter>
);
