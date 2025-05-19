import React, { useState, useEffect } from 'react';
import { data, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import '../api/api'
import { fetchMatchHistory, fetchSpells } from '../api/api';


export default function MatchHistory({onExpose}) {
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState(null);
    const {gameName, tagLine, localRegion, region} = useOutletContext();
    const [error, setError] = useState(null);
    const [spellsData, setSpellsData] = useState(null);


    const loadMatchHistory = async() =>{
        setLoading(true)
        setError(null)

        try {
            const data = await fetchMatchHistory({gameName, tagLine, localRegion, region});
            setMatches(data);
        }
        catch(err){
            console.error("Ошибка при передаче данных", err);
        }
        finally{
            setLoading(false);
        }
    }


    useEffect(() => {
        loadMatchHistory()
    }, [])

    // useEffect(() => {
    //     const fetchSpells = async () => {
    //     const responce = await axios.get("https://ddragon.leagueoflegends.com/cdn/15.10.1/data/en_US/summoner.json");
    //     setSpellsData(responce.data.data);
    // };
    // fetchSpells();
    // }, [])

    const loadSumms = async() =>{
        const spells = await fetchSpells();
        setSpellsData(spells)
    }

    useEffect(() =>{
        loadSumms()
    }, [])

    const summonerSpellById = (id) =>{
            if (!spellsData) return null;
            const spell = Object.values(spellsData).find(p=>p.key == id)
            return spell?.id
    }

    const matchWinOrLose = (matchId) => {
        if (!matches || matches.length === 0) return null;

        const match = matches.find(
            (element) => element?.metadata?.matchId === matchId
        );

        if (!match) return 'Матч не найден';

        const player = match.info.participants.find(
            (p)=> p.riotIdGameName === gameName
        );
        if (!player) return 'Игрок не найден';
        return player.win ? 'Победа' : 'Поражение';
};
    return (
        <div id = "match_history_component" class = 'justify-content-center w-75 mx-auto'>
            <h1 class = "text-center">История матчей</h1>
            <p>{loading ? "Загрузка" : ''}</p>
            {matches && !loading && !error&&
            <div class = "row">
                {matches.map((match, index) => {
                     if (!match || !match.info || !match.info.participants) return null;
                    const player = match.info.participants.find(p => p.riotIdGameName === gameName);
                    
                    if (!player) return null; 
                    console.log(player)
                    
                    const spell1 = summonerSpellById(player.summoner1Id);
                    console.log(spell1);
                    
                    const spell2 = summonerSpellById(player.summoner2Id);
                    console.log(spell2);
                    
                    return(
                        <div key = {index} class = "col-4 col-md-3 col-lg-2 ">
                            <div key = {index} class = "card text-center border-5 border-dark rounded-2 bg-dark m-1 p-1" >
                                <div class = "container bg-secondary border-3 border border-dark rounded-2 ">
                                <img 
                                    class="img-fluid rounded w-100 h-100 my-3 mx-auto d-block" 
                                    src = {`https://ddragon.leagueoflegends.com/cdn/15.10.1/img/champion/${player.championName}.png`}
                                    alt = {player.championName}                                     
                                 />
                                <div className='row justify-content-center'>
                                    <div class='col m-2'>
                                        <img 
                                            class='img-fluid w-100 h-100 mx-auto d-block border border-3 border-dark rounded-2'
                                            src = {`https://ddragon.leagueoflegends.com/cdn/15.10.1/img/spell/${spell1}.png`}
                                            alt = {spell1}
                                        />
                                    </div>
                                    <div class='col m-2 '>
                                        <img 
                                            class='img-fluid w-100 h-100 mx-auto d-block border border-3 border-dark rounded-2'
                                            src = {`https://ddragon.leagueoflegends.com/cdn/15.10.1/img/spell/${spell2}.png`}
                                            alt = {spell2}

                                    />
                                 </div>
                                </div>
                                </div>
                                <div class ="card-body text-center bg-secondary border border-3 rounded-2 border-dark">
                                    <p class = 'fs-2 card-title text-black'>{player.championName}</p>
                                    <p class = {`fs-4 bg-light fw-bold ${player.win ? "border-success" : "border-danger"} border border-2 ${player.win ? "text-success" : "text-danger"}`}>{matchWinOrLose(match.metadata.matchId)}</p>
                                </div>
                            </div>
                        </div>)
                    }
                )
            }
            </div>}
        </div>  )
}