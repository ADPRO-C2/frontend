// components/TopUpForm.tsx
import React, { useState } from 'react';
import { createTopUp } from '@/services/topUpService';

const TopUpForm: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethodId, setPaymentMethodId] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { userId, amount, paymentMethodId };
    try {
      await createTopUp(data);
      alert('Top-up successful!');
    } catch (error) {
      console.error('Failed to create top-up:', error);
      alert('Failed to create top-up.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value, 10))} required />
      </div>
      <div>
        <label>Payment Method ID:</label>
        <input type="text" value={paymentMethodId} onChange={(e) => setPaymentMethodId(e.target.value)} required />
      </div>
      <button type="submit">Submit Top-Up</button>
    </form>
  );
};

export default TopUpForm;
