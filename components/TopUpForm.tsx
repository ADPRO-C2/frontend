// components/TopUpForm.tsx
import React, { useState, useEffect } from 'react';
import { createTopUp } from '@/services/topUpService';
import { getAllPaymentMethods } from '@/services/paymentService';
import '@/styles/topupPayment.css';

const TopUpForm: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>('');

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const methods = await getAllPaymentMethods();
        setPaymentMethods(methods);
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { userId, amount, paymentMethodId: selectedPaymentMethodId };
    try {
      await createTopUp(data);
      alert('Top-up successful!');
    } catch (error) {
      console.error('Failed to create top-up:', error);
      alert('Failed to create top-up.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="form-label">User ID:</label>
        <input type="text" className="form-input" placeholder="Enter user ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      </div>
      <div>
        <label className="form-label">Amount:</label>
        <input type="number" className="form-input" placeholder="Enter amount, e.g., 100000" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} required />
      </div>
      <div>
        <label className="form-label">Payment Method:</label>
        <select 
          className="form-input" 
          value={selectedPaymentMethodId} 
          onChange={(e) => setSelectedPaymentMethodId(e.target.value)}
          required
        >
          <option value="">Select Payment Method</option>
          {paymentMethods.map(method => (
            <option key={method.paymentId} value={method.paymentId}>
              {method.paymentType} - {method.paymentDetails?.cardNumber || method.paymentDetails?.phoneNumber}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="form-button">Submit Top-Up</button>
    </form>
  );
};

export default TopUpForm;
