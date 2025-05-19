import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RankStats from './components/RankStats.js';
import './components/RankStats.css'; 
import MatchHistory from './components/MatchHistory.js';
import ChampionStats from './components/ChampionStats';
import Home from './components/Home.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element = {<Home />}/>
        <Route path ='/rank_status' element = {<RankStats />}/>
        {/* <Route path ='/champion_stats' element = {<ChampionStats />}/> */}
        <Route path = '/match_history' element = {<MatchHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;