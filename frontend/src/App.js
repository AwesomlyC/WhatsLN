import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LightNovel from './components/LightNovels'
import SingleLightNovel from './components/SingleLightNovel';
import Header from './components/Header';
import FilterNovel from './components/FilterNovel';
import SearchPage from './components/SearchPage';
import ScrollButton from './components/ScrollButton';
function App() {
  return (
    <div>
      <Router>
        <Header />
        {/* <h1>Light Novel Application</h1> */}
        <div className="container">
          <Routes>
            <Route exact path='/' Component={LightNovel}/>
            <Route path='/single-ln' Component={SingleLightNovel} />
            <Route path='/filter' Component={FilterNovel} />
            <Route path='/search' Component={SearchPage} />
          </Routes>
        </div>
        < ScrollButton />
      </Router>
    </div>
  );
}

export default App;
