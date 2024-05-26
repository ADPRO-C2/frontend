// components/TopUpList.tsx
import React, { useState } from 'react';
import { TopUp } from '@/interfaces';
import { cancelTopUp } from '@/services/topUpService';
import ConfirmationModal from './ConfirmationModal';
import '@/styles/topupPayment.css';

interface TopUpListProps {
  topUps: TopUp[];
  refreshData: () => void;
}

const TopUpList: React.FC<TopUpListProps> = ({ topUps, refreshData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const handleCancelClick = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (selectedId) {
      await cancelTopUp(selectedId);
      refreshData();
    }
    setModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Top-Ups</h2>
      <div className="card-container">
        {topUps.map((topUp) => (
          <div key={topUp.id} className={`card status-${topUp.status.toLowerCase()}`}>
            <div className={`card-title ${'status-' + topUp.status.toLowerCase()}`}>{topUp.status}</div>
            <div className="card-details">
              Topup Id: {topUp.id}
              <br />
              Amount: {topUp.amount}
            </div>
            {topUp.status === 'PENDING' && (
              <button className="cancel-button" onClick={() => handleCancelClick(topUp.id)}>
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Confirm Cancellation"
        message="Are you sure you want to cancel this top-up?"
      />
    </div>
  );
};

export default TopUpList;
