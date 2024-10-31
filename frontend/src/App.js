import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LightNovel from './components/LightNovels'
import SingleLightNovel from './components/SingleLightNovel';
import Header from './components/Header';
import FilterNovel from './components/FilterNovel';
import SearchPage from './components/SearchPage';
import ScrollButton from './components/ScrollButton';
import Login from './components/Login';
import Callback from './components/Callback'
function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route exact path='/' Component={LightNovel}/>
            <Route path='/single-ln' Component={SingleLightNovel} />
            <Route path='/filter' Component={FilterNovel} />
            <Route path='/search' Component={SearchPage} />
            <Route path='/login' Component={Login} />
            <Route path='/Callback' Component={Callback} />
          </Routes>
        </div>
        < ScrollButton />
      </Router>
    </div>
  );
}

export default App;
