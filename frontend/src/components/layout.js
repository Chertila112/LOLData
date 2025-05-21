import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import MatchHistory from './MatchHistory';



export default function Layout()
{
    const [gameName, setGameName] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [region, setRegion] = useState('europe');
    const [localRegion, setLocalRegion] = useState('ru');
    
    const formData = { gameName, tagLine, region, localRegion};





    return (<div className='text-center'>
    <div class = 'container w-25 mx-auto border border-3 border-bottom-0 rounded-bottom-0 rounded-top-3'>
      <div class = "mx-auto w-75">
      <h2>Проверка ранговой статистики</h2>
      <form className="p-4 bg-light rounded shadow-sm">
    <div className="mb-3">
        <label className="form-label fw-bold">Имя в игре:</label>
            <input
            type="text"
            className="form-control"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="Например: Faker"
            />
    </div>

    <div className="mb-3">
        <label className="form-label fw-bold">Тэг:</label>
        <input
        type="text"
        className="form-control"
        value={tagLine}
        onChange={(e) => setTagLine(e.target.value)}
        placeholder="Например: KR1"
        />
    </div>

    <div className="mb-3">
        <label className="form-label fw-bold">Регион аккаунта:</label>
        <select
        className="form-select"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        >
        <option value="europe">Europe</option>
        <option value="asia">Asia</option>
        <option value="americas">Americas</option>
        </select>
    </div>

    <div className="mb-3">
        <label className="form-label fw-bold">Локальный регион:</label>
        <select
        className="form-select"
        value={localRegion}
        onChange={(e) => setLocalRegion(e.target.value)}
        >
        <option value="ru">RU</option>
        <option value="euw">EUW</option>
        <option value="na">NA</option>
        <option value="kr">KR</option>
        </select>
    </div>
    </form>
        
      </div>
    </div>
        <div class="btn-group w-25 mb-2 border border-3 rounded-0" role="group" aria-label="Basic example">
            <Link to='/' type="button" class="btn btn-danger rounded-0" >МАСТЕРСТВО</Link>
            <Link to='/rank_status' type="button" class="btn btn-warning">РАНГ</Link>
            <Link to='/match_history' type="button" class="btn btn-success rounded-0">ИСТОРИЯ ИГР</Link>
        </div>
        <Outlet context={formData}/>
    </div>
    )
}
