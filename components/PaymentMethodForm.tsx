import React, { useState } from 'react';
import { createPaymentMethod } from '@/services/paymentService';
import '@/styles/topupPayment.css';

interface PaymentMethodFormProps {
  refreshPaymentMethods: () => Promise<void>;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ refreshPaymentMethods }) => {
  const [paymentType, setPaymentType] = useState<string>('card');
  const [userId, setUserId] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleCardNumberChange = (value: string) => {
    if (/^\d{0,16}$/.test(value)) {
      setCardNumber(value);
    }
  };

  const handleCVCChange = (value: string) => {
    if (/^\d{0,4}$/.test(value)) {
      setCvc(value);
    }
  };

  const validateExpiryDate = (date: string) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateExpiryDate(expiryDate)) {
      alert('Invalid expiry date. Please use MM/YY format.');
      return;
    }
    const data = { userId, paymentType, cardNumber, cvc, expiryDate, phoneNumber };
    try {
      const result = await createPaymentMethod(data);
      if (result) {
        alert('Payment method added successfully!');
        refreshPaymentMethods();
      }
    } catch (error) {
      console.error('Failed to add payment method:', error);
      alert('Failed to add payment method.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label className="form-label">User ID:</label>
        <input type="text" className="form-input" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      </div>
      <div className="form-group">
        <label className="form-label">Payment Type:</label>
        <select className="form-input" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
          <option value="card">Credit Card</option>
          <option value="e-wallet">Mobile Payment</option>
        </select>
      </div>
      {paymentType === 'card' ? (
        <>
          <div className="form-group">
            <label className="form-label">Card Number:</label>
            <input type="text" className="form-input" placeholder="1234 5678 9101 1121" value={cardNumber} onChange={(e) => handleCardNumberChange(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">CVC:</label>
            <input type="text" className="form-input" placeholder="123" value={cvc} onChange={(e) => handleCVCChange(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Expiry Date:</label>
            <input type="text" className="form-input" placeholder="MM/YY, e.g., 12/24" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
          </div>
        </>
      ) : (
        <div className="form-group">
          <label className="form-label">Phone Number:</label>
          <input type="text" className="form-input" placeholder="081234567890" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
      )}
      <button type="submit" className="form-button">Add Payment Method</button>
    </form>
  );
};

export default PaymentMethodForm;
