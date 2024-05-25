// components/TopUpList.tsx
import React from 'react';
import { TopUp } from '@/interfaces';
import { cancelTopUp } from '@/services/topUpService';

interface TopUpListProps {
  topUps: TopUp[];
  refreshData: () => void;
}

const TopUpList: React.FC<TopUpListProps> = ({ topUps, refreshData }) => {
  const handleCancel = async (id: string) => {
    try {
      await cancelTopUp(id);
      refreshData();
    } catch (error) {
      console.error('Failed to cancel top-up:', error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Top-Ups</h2>
      <ul className="list-disc pl-5">
        {topUps.map((topUp) => (
          <li key={topUp.id} className="mb-2">
            ID: {topUp.id}, User: {topUp.userId}, Amount: {topUp.amount}, Status: {topUp.status},
            Payment Method ID: {topUp.paymentMethodId}
            <button className="ml-4 py-1 px-2 bg-red-500 hover:bg-red-700 text-white rounded" onClick={() => handleCancel(topUp.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUpList;


