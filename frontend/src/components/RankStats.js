import React, { useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { useEffect} from 'react';
function RankStats() {

  const {gameName, tagLine, localRegion, region} = useOutletContext();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchRankStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/rank_status`,
        {
          params: {
            gameName,
            tagLine,
            localRegion,
            region
          }
        }
      );
      
      setStats(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Ошибка при получении данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchRankStats()
  },[])

  return (
    <div key = "content_container" class='container w-25 border border-5 rounded-3 bg-light'>

      {error && <div className="error-message">{error}</div>}

      {stats && (
        <div className="stats-results">
          <h3>Ранговая статистика:</h3>
          {Array.isArray(stats) && stats.length > 0 ? (
            stats.map((queue, index) => {
              const winrate = (queue.wins / (queue.wins + queue.losses)) * 100

              return (<div key={index} className="queue-stats">
                <h4>{queue.queueType === 'RANKED_SOLO_5x5' ? 'Ранговый соло' : 'Ранговый флекс'}</h4>
                <p>Тир: {queue.tier} {queue.rank}</p>
                <p>LP: {queue.leaguePoints}</p>
                <p>Победы: {queue.wins}</p>
                <p>Поражения: {queue.losses}</p>
                <p>Винрейт: <span class={winrate>50 ? 'text-succes' : 'text-danger'}>{winrate}%</span></p>
              </div>)
              }
            )
          ) : (
            <p>Игрок не имеет ранговых данных в текущем сезоне</p>
          )}
        </div>
      )
    }
    </div>
  );
}
export default RankStats;