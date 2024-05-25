// components/PaymentMethodForm.tsx
import React, { useState } from 'react';
import { createPaymentMethod } from '@/services/paymentService';

const PaymentMethodForm: React.FC = () => {
  const [paymentType, setPaymentType] = useState<string>('card');
  const [userId, setUserId] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { userId, paymentType, cardNumber, cvc, expiryDate, phoneNumber };
    try {
      await createPaymentMethod(data);
      alert('Payment method added successfully!');
    } catch (error) {
      console.error('Failed to add payment method:', error);
      alert('Failed to add payment method.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      </div>
      <div>
        <label>Payment Type:</label>
        <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
          <option value="card">Credit Card</option>
          <option value="mobile">Mobile Payment</option>
        </select>
      </div>
      {paymentType === 'card' ? (
        <>
          <div>
            <label>Card Number:</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
          </div>
          <div>
            <label>CVC:</label>
            <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} required />
          </div>
          <div>
            <label>Expiry Date:</label>
            <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
          </div>
        </>
      ) : (
        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
      )}
      <button type="submit">Add Payment Method</button>
    </form>
  );
};

export default PaymentMethodForm;
