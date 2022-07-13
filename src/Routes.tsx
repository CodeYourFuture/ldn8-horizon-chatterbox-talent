import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './containers/About';
import FAQ from './containers/FAQ';
import Programs from './containers/Programs';

const TalentBoxRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Programs />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
};

export default TalentBoxRoutes;
