import Navbar from './Components/Navbar';
import Routing from './Routing';
import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter />
      <Navbar />
      <Routing />
      <BrowserRouter /> 

    </div>
  );
}

export default App;
