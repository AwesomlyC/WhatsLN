import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LightNovel from './components/LightNovels'
import SingleLightNovel from './components/SingleLightNovel';

function App() {
  return (
    <div>
      <Router>
        <h1>Light Novel Application</h1>
        <div className="container">
          <Routes>
            <Route exact path='/' Component={LightNovel}/>
            <Route path='/single-ln' Component={SingleLightNovel}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
