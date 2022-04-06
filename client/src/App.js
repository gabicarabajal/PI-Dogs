import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogCreate from './components/DogCreate';
import DogDetail from './components/DogDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/dog' element={<DogCreate/>}/>
        <Route exact path='/dogs/:id' element={<DogDetail/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
