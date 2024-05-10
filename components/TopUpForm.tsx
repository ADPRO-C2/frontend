// components/TopUpForm.tsx
import { useState } from 'react';
import { createTopUp } from '@/services/topUpService';

import { TopUpRequest } from '@/interfaces';

interface TopUpFormProps {
  onClose: () => void;
  onCreated: () => void;
}

const TopUpForm = ({ onClose, onCreated }: TopUpFormProps) => {
  const [formData, setFormData] = useState<TopUpRequest>({
    userId: '',
    amount: 0, // Ensure this is a number to match your interface
    paymentMethodId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'amount' ? parseFloat(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTopUp(formData);
      onCreated();
      onClose();
    } catch (error) {
      console.error('Failed to create top-up:', error);
    }
  };

  return (
    <div>
      <h2>Top-Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userId" placeholder="User ID" onChange={handleChange} value={formData.userId} />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} value={formData.amount.toString()} />
        <input type="text" name="paymentMethodId" placeholder="Payment Method ID" onChange={handleChange} value={formData.paymentMethodId} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TopUpForm;
