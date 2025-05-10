import React, { useState } from 'react';
import axios from 'axios';

function SummonerSearch() {

    const [gameName, setGameName] = useState('');
    const [region, setRegion] = useState('europe');
    const [tagLine, setTagLine] = useState('');
    const [summonerData, setSummonerData] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Флаг загрузки
    const [error, setError] = useState(null); // Храним ошибки

    const handleSubmit = async(e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        setIsLoading(true); // Включаем состояние загрузки
        setError(null); // Сбрасываем ошибки

        try {
            const response = await axios.get(`http://localhost:8000/${gameName}/${tagLine}`, {
                params: { region }
            });

            setSummonerData(response.data);
        } catch (err) {
            setError(err.response ?.data ?.detail || 'Произошла ошибка');
        } finally {
            setIsLoading(false);
        }
    }          
    return (<div className="summoner-search">
        <h1>LoL Stat Tracker</h1>
        
        {/* Форма поиска summoner'а */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Имя summoner'а:
              <input 
                type="text" 
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                required
              />
            </label>
          </div>
          </form>

          <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Имя summoner'а:
              <input 
                type="text" 
                value={tagLine}
                onChange={(e) => setTagNLine(e.target.value)}
                required
              />
            </label>
          </div>
          
          <div className="form-group">
            <label>
              Регион:
              <select 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="europe">Europe</option>
                <option value="americas">Americas</option>
                <option value="asia">Asia</option>
                
              </select>
            </label>
          </div>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Загрузка...' : 'Найти'}
          </button>
        </form>
  
        {/* Отображение результатов */}
        {error && <div className="error">{error}</div>}
        
        {summonerData && (
          <div className="summoner-info">
            <h2>{summonerData.name}</h2>
            <p>Уровень: {summonerData.summonerLevel}</p>
            <p>Регион: {region.toUpperCase()}</p>
          </div>
        )}
      </div>);
}

export default SummonerSearch;