import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RankStats from './components/RankStats.js';
import MatchHistory from './components/MatchHistory.js';
import ChampionStats from './components/ChampionStats';
import Home from './components/Home.js'
import Layout from './components/layout.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Layout />}>
          <Route index element = {<Home />} />
          <Route path ='/rank_status' element = {<RankStats />}/>
          <Route path = '/match_history' element = {<MatchHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;