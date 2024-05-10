// components/TopUpList.tsx
import { useEffect, useState } from 'react';
import { getAllTopUps, cancelTopUp } from '@/services/topUpService';
import { TopUp } from '@/interfaces';
const TopUpList = () => {
  const [topUps, setTopUps] = useState<TopUp[]>([]);

  const fetchTopUps = async () => {
    const response = await getAllTopUps();
    setTopUps(response.data);
  };

  useEffect(() => {
    fetchTopUps();
  }, []);

  const handleCancel = async (id: string) => {
    await cancelTopUp(id);
    fetchTopUps();
  };

  return (
    <div>
      <h2>Top-Ups</h2>
      <ul>
        {topUps.map((topUp) => (
          <li key={topUp.id}>
            {topUp.amount} - {topUp.status}
            <button onClick={() => handleCancel(topUp.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUpList;
