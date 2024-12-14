// App.js
import React, { useState } from 'react';
import Nav from './Components/Nav';
import Navlinks from './Components/Navlinks';
import ParfumList from './Components/Parfumlist';
import Footer from './Components/Footer';

import Section from './Components/Section'

function App() {
 

  return (
    <>
      <Nav />
      <Navlinks />
      <Section/>
      <ParfumList  /> 
      <Footer />
       
    </>
  );
}

export default App;

