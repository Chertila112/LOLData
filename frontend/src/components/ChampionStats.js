import { useEffect, useState } from 'react';
import '../App'
import '../api/api'
import { useOutletContext } from 'react-router-dom'
import { fetchChampionStats, fetchChampJson } from '../api/api';

export default function ChampionStats(){

    const {gameName, tagLine, localRegion, region} = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [champions, setChampions] = useState(null);
    const [mastery, setMastery] = useState(null)
    const [count, setCount] = useState(6)


    const loadChampStats = async() => 
        {
            setLoading(true)
            setError(null)
            try{
                const data = await fetchChampionStats({gameName, tagLine, localRegion, region}, count);
                setMastery(data);
                console.log(data);
            } 
            catch(error){
                setError(error);
                console.error(error);
            }
            finally{
                setLoading(false);
            }
        }

    useEffect(() => {  
        loadChampStats();
    }, []);

    
    useEffect(() =>
    {   
        const loadChampions = async() =>
        {
            const data = await fetchChampJson();
            setChampions(data);
        }
        loadChampions()
    }, []);


    const getChampById = (key) => {
        if (!champions) return null;
        const icon = Object.values(champions).find(p => key == p.key);
        return icon?.id
    }

    return (
    <div>
        {<div class='container mx-auto'>
            <div class = 'w-25 mx-auto my-3'><label className="form-label fw-bold">Введите кол-во чемпионов:</label>
                <input
                    type="text"
                    className="form-control"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    placeholder="По-умолчанию = 5"
                />
            </div>
            <button class='btn-primary mx-auto' onClick={loadChampStats}>{loading ? "Загрузка" : 'Обновить'}</button>
                {
                mastery &&
                <div class ='row my-2 border border-5 border-dark rounded bg-success'>
                {(mastery.map((champ, index) => {
                    const champion = getChampById(champ.championId);
                    if (!champion) return null;
                    return (
                        <div class='col-4 col-md-3 col-lg-2 my-1'>
                            <div key = {index} class = 'card bg-dark border border-5 border-dark rounded-3 text-center'>
                                <div className='img_holder bg-secondary rounded-top-2 w-100 mx-auto p-2'>
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/15.10.1/img/champion/${champion}.png`}
                                    class = 'mx-auto img-fluid d-block w-100 h-100 my-3'/> 
                                    <p class ='h3 fw-bold text-black mt-3'>{champion}</p>
                                </div>
                                <div class='card-title mt-2 rounded-bottom-2 w-100 mx-auto bg-secondary'>
                                    <p class = 'h2'>Level {champ.championLevel}</p>
                                    <p class ='h2'>P: {champ.championPoints}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
                )}
                </div>
                }
            </div>
        }      
    </div>)
}