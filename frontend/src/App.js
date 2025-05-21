import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RankStats from './components/RankStats.js';
import MatchHistory from './components/MatchHistory.js';
import Layout from './components/layout.js';
import ChampionStats from './components/ChampionStats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Layout />}>
          <Route index element = {<ChampionStats />} />
          <Route path ='/rank_status' element = {<RankStats />}/>
          <Route path = '/match_history' element = {<MatchHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;