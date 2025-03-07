import React from 'react';
import './App.scss';
import Footer from './Footer';
import Header from './Header';
import TalentBoxRoutes from './Routes';

function App() {
  return (
    <div className="App">
      <Header />
      <TalentBoxRoutes />
      <Footer />
    </div>
  );
}
window.onload = function () {
  sessionStorage.clear();
};
export default App;
