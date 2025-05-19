import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function MatchHistory() {
    const [matches, setMatches] = useState(null);
    const [gameName, setGameName] = useState('SplitPushEnjoyer');
    const [tagLine, setTagLine] = useState('BALD');
    const [region, setRegion] = useState('europe');
    const [localRegion, setLocalRegion] = useState('ru')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [spellsData, setSpellsData] = useState(null);

    const fetchMatchHistory = async() =>{
        setLoading(true)
        setError(null)

        try {
        const responce =  await axios.get(
            "http://127.0.0.1:8000/match_history",
            {
                params: {
                    gameName,
                    tagLine, 
                    localRegion,
                    region
                }
            }
        );

            setMatches(responce.data);
        }
        catch(err){
            setError(err.response?.data?.detail || 'Ошибка при получении данных');
        }
        finally{
            setLoading(false);
        }
    }
    
    useEffect(() => {
        const fetchSpells = async() => {
            const responce = await axios.get('https://ddragon.leagueoflegends.com/cdn/15.10.1/data/en_US/summoner.json');
            setSpellsData(responce.data.data);
        }
        fetchSpells()
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
        <div id = "match_history_component" class = 'justify-content-center'>
            <h1 class = "text-center">История матчей</h1>
            <div class = "text-center">
                <button class = "btn btn-success btn-lg" onClick={fetchMatchHistory}>{loading ? "Загрузка" : "Показать"}</button>
            </div>
            {matches &&
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
                        <div key = {index} class = "col-4 col-md-3 col-lg-2">
                            <div key = {index} class = "card text-center border-5 border-dark rounded-2 bg-dark m-1 p-1" >
                                <div class = "container bg-secondary border-3 border border-dark rounded-2 ">
                                <img 
                                    class="img-fluid rounded w-100 h-100 my-3 mx-auto d-block" 
                                    src = {`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${player.championName}.png`}
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
                                    <p class = {`fs-3 bg-light fw-bold ${player.win ? "border-success" : "border-danger"} border border-2 ${player.win ? "text-success" : "text-danger"}`}>{matchWinOrLose(match.metadata.matchId)}</p>
                                </div>
                            </div>
                        </div>)
                    }
                )
            }
            </div>}
        </div>  )
}