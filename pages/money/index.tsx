// pages/money/index.tsx
import React, { useState, useEffect } from 'react';
import PaymentMethodList from '@/components/PaymentMethodList';
import PaymentMethodForm from '@/components/PaymentMethodForm';
import TopUpForm from '@/components/TopUpForm';
import TopUpList from '@/components/TopUpList';
import CustomModal from '@/components/CustomModal';
import { getAllPaymentMethods } from '@/services/paymentService';
import { getAllTopUps } from '@/services/topUpService';
import '@/styles/topupPayment.css';

const MoneyPage: React.FC = () => {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isTopUpModalOpen, setTopUpModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [topUps, setTopUps] = useState([]);

  useEffect(() => {
    fetchPaymentMethods();
    fetchTopUps();
  }, []);

  const fetchPaymentMethods = async () => {
    const data = await getAllPaymentMethods();
    setPaymentMethods(data);
  };

  const fetchTopUps = async () => {
    const data = await getAllTopUps();
    setTopUps(data);
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-xl font-bold mb-4">Money Management</h1>
      <div className="flex justify-between mb-6">
      <button className="button-secondary" onClick={() => setTopUpModalOpen(true)}>Add Top-Up</button>
      <button className="button-secondary" onClick={() => setPaymentModalOpen(true)}>Add Payment Method</button>
      </div>
      <div className="flex flex-wrap gap-8">
        <div className="flex-1 min-w-[40%] card">
          <TopUpList topUps={topUps} refreshData={fetchTopUps} />
        </div>
        <div className="flex-1 min-w-[40%] card">
          <PaymentMethodList paymentMethods={paymentMethods} refreshData={fetchPaymentMethods} />
        </div>
      </div>
      <CustomModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} title="Add Payment Method">
        <PaymentMethodForm />
      </CustomModal>
      <CustomModal isOpen={isTopUpModalOpen} onClose={() => setTopUpModalOpen(false)} title="Add Top-Up">
        <TopUpForm />
      </CustomModal>
    </div>
  );
};

export default MoneyPage;
