import React, { useState, useEffect } from 'react';
import { createTopUp } from '@/services/topUpService';
import { getAllPaymentMethodsByUserId } from '@/services/paymentService';
import '@/styles/topupPayment.css';

interface TopUpFormProps {
  user: { id: number }; // Assuming this is passed correctly from the parent component
  refreshTopUps: () => Promise<void>;
}

const TopUpForm: React.FC<TopUpFormProps> = ({ user, refreshTopUps }) => {
  const [amount, setAmount] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>('');

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const methods = await getAllPaymentMethodsByUserId(user.id);
        setPaymentMethods(methods);
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };

    if (user.id) fetchPaymentMethods();
  }, [user.id]);

  const validateAmount = (input: string) => /^(\d+)?([.]?\d{0,3})?$/.test(input);

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
      const data = { userId: user.id, amount: numericAmount, paymentMethodId: selectedPaymentMethodId };
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
        <label className="form-label">Amount:</label>
        <input type="text" className="form-input" placeholder="Enter amount, e.g., 100000.500" value={amount} onChange={handleAmountChange} required />
      </div>
      <div>
        <label className="form-label">Payment Method:</label>
        <select className="form-input" value={selectedPaymentMethodId} onChange={(e) => setSelectedPaymentMethodId(e.target.value)} required>
          <option value="">Select Payment Method</option>
          {paymentMethods.map((method) => (
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
