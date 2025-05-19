import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/rank_status');
  };

  return (
    <div>
      <h1>Главная страница</h1>
      <button onClick={handleClick}>Перейти к статистике</button>
    </div>
  );
}