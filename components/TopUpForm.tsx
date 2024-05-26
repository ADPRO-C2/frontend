import React, { useState, useEffect } from 'react';
import { createTopUp } from '@/services/topUpService';
import { getAllPaymentMethods } from '@/services/paymentService';
import '@/styles/topupPayment.css';

interface TopUpFormProps {
  refreshTopUps: () => Promise<void>;
}

const TopUpForm: React.FC<TopUpFormProps> = ({ refreshTopUps }) => {
  const [userId, setUserId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
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

  const validateAmount = (input: string) => {
    // Allow only numbers and a single dot, prevent negative and format for three decimal places
    const validFormat = /^(\d+)?([.]?\d{0,3})?$/;
    return validFormat.test(input);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (validateAmount(newValue) || newValue === "") {
      setAmount(newValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      const data = { userId, amount: numericAmount, paymentMethodId: selectedPaymentMethodId };
      try {
        const result = await createTopUp(data);
        if (result) {
          alert('Top-up successful!');
          refreshTopUps();
        }
      } catch (error) {
        console.error('Failed to create top-up:', error);
        alert('Failed to create top-up.');
      }
    } else {
      alert('Please enter a valid positive amount');
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
        <input type="text" className="form-input" placeholder="Enter amount, e.g., 100000.500" value={amount} onChange={handleAmountChange} required />
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
