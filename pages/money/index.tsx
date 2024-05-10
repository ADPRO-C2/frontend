// pages/money/index.tsx
import React, { useState } from 'react';
import TopUpList from '@/components/TopUpList';
import PaymentMethodList from '@/components/PaymentMethodList';
import TopUpForm from '@/components/TopUpForm';
import PaymentMethodForm from '@/components/PaymentMethodForm';
import Modal from '@/components/modal';

const MoneyPage: React.FC = () => {
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);

  const handleTopUpModalOpen = () => setIsTopUpModalOpen(true);
  const handleTopUpModalClose = () => setIsTopUpModalOpen(false);

  const handlePaymentMethodModalOpen = () => setIsPaymentMethodModalOpen(true);
  const handlePaymentMethodModalClose = () => setIsPaymentMethodModalOpen(false);

  const refreshData = () => {
    // Logic to refresh data (fetch payment methods and top-ups)
  };

  return (
    <div>

      <div className="container mx-auto my-8">
        <button onClick={handleTopUpModalOpen}>Add Top-Up</button>
        <button onClick={handlePaymentMethodModalOpen}>Add Payment Method</button>

        <TopUpList />
        <PaymentMethodList />

        {isTopUpModalOpen && (
          <Modal onClose={handleTopUpModalClose}>
            <TopUpForm onClose={handleTopUpModalClose} onCreated={refreshData} />
          </Modal>
        )}

        {isPaymentMethodModalOpen && (
          <Modal onClose={handlePaymentMethodModalClose}>
            <PaymentMethodForm onClose={handlePaymentMethodModalClose} onCreated={refreshData} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MoneyPage;
