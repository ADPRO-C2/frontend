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
import Header from '@/components/Header';

const MoneyPage: React.FC = () => {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isTopUpModalOpen, setTopUpModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [topUps, setTopUps] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0); // Example balance state

  useEffect(() => {
    fetchPaymentMethods();
    fetchTopUps();
    fetchBalance(); // Example function to fetch balance
  }, []);

  const fetchPaymentMethods = async () => {
    const data = await getAllPaymentMethods();
    setPaymentMethods(data);
  };

  const fetchTopUps = async () => {
    const data = await getAllTopUps();
    setTopUps(data);
  };

  const fetchBalance = async () => {
    // You would fetch and calculate the balance here
    setCurrentBalance(5000); // Placeholder value
  };

  const refreshTopUps = async () => {
    const updatedTopUps = await getAllTopUps();
    setTopUps(updatedTopUps);
  };

  const refreshPaymentMethods = async () => {
    const updatedMethods = await getAllPaymentMethods();
    setPaymentMethods(updatedMethods);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto my-8 px-4">
        <h1 className="text-3xl font-bold mb-4">Money Management</h1>
        <div className="balance-display">
          <h2 className="text-2xl font-bold dark-blue-text">Your Current Balance: RP. {currentBalance.toFixed(2)}</h2>        
        </div>
        <div className="flex justify-between mb-6">
          <button className="button-secondary" onClick={() => setTopUpModalOpen(true)}>Add Top-Up</button>
          <button className="button-secondary" onClick={() => setPaymentModalOpen(true)}>Add Payment Method</button>
        </div>
        <div className="flex flex-wrap gap-8">
          <div className="flex-1 min-w-[40%] card">
            <TopUpList topUps={topUps} refreshData={refreshTopUps} />          
          </div>
          <div className="flex-1 min-w-[40%] card">
            <PaymentMethodList paymentMethods={paymentMethods} refreshData={refreshPaymentMethods} />
          </div>
        </div>
        {/* <CustomModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} title="Add Payment Method">
        <PaymentMethodForm refreshPaymentMethods={refreshPaymentMethods} />        
        </CustomModal>
        <CustomModal isOpen={isTopUpModalOpen} onClose={() => setTopUpModalOpen(false)} title="Add Top-Up">
          <TopUpForm refreshTopUps={refreshTopUps} />
        </CustomModal> */}
      </div>
    </div>
  );
};

export default MoneyPage;
