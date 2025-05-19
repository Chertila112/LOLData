import React, { useState } from 'react';
import axios from 'axios';

function RankStats() {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [region, setRegion] = useState('europe');
  const [localRegion, setLocalRegion] = useState('ru');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameName && tagLine) {
      fetchRankStats();
    }
  };

  return (
    <div className="rank-stats-container">
      <h2>Проверка ранговой статистики</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>
            Имя в игре:
            <input
              type="text"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Например: Faker"
            />
          </label>
        </div>
        
        <div className="input-group">
          <label>
            Тэг:
            <input
              type="text"
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value)}
              placeholder="Например: KR1"
            />
          </label>
        </div>
        
        <div className="input-group">
          <label>
            Регион аккаунта:
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="americas">Americas</option>
            </select>
          </label>
        </div>
        
        <div className="input-group">
          <label>
            Локальный регион:
            <select value={localRegion} onChange={(e) => setLocalRegion(e.target.value)}>
              <option value="ru">RU</option>
              <option value="euw">EUW</option>
              <option value="na">NA</option>
              <option value="kr">KR</option>
            </select>
          </label>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Получить статистику'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {stats && (
        <div className="stats-results">
          <h3>Ранговая статистика:</h3>
          {Array.isArray(stats) && stats.length > 0 ? (
            stats.map((queue, index) => (
              <div key={index} className="queue-stats">
                <h4>{queue.queueType === 'RANKED_SOLO_5x5' ? 'Ранговый соло' : 'Ранговый флекс'}</h4>
                <p>Тир: {queue.tier} {queue.rank}</p>
                <p>LP: {queue.leaguePoints}</p>
                <p>Победы: {queue.wins}</p>
                <p>Поражения: {queue.losses}</p>
                <p>Винрейт: {(queue.wins / (queue.wins + queue.losses)) * 100}%</p>
              </div>
            ))
          ) : (
            <p>Игрок не имеет ранговых данных в текущем сезоне</p>
          )}
        </div>
      )}
    </div>
  );
}

export default RankStats;