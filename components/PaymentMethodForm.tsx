// components/PaymentMethodForm.tsx
import { useState } from 'react';
import { createPaymentMethod } from '@/services/paymentService';
import { PaymentMethodRequest } from '../interfaces';

interface PaymentMethodFormProps {
  onClose: () => void;
  onCreated: () => void;
}

const PaymentMethodForm = ({ onClose, onCreated }: PaymentMethodFormProps) => {
  const [formData, setFormData] = useState<PaymentMethodRequest>({
    paymentType: '',
    cardNumber: '',
    cvc: '',
    expiryDate: '',
    phoneNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPaymentMethod(formData);
      onCreated();
      onClose();
    } catch (error) {
      console.error('Failed to create payment method:', error);
    }
  };

  return (
    <div>
      <h2>Add Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <select name="paymentType" onChange={handleChange} value={formData.paymentType}>
          <option value="">Select Type</option>
          <option value="card">Card</option>
          <option value="e-wallet">E-Wallet</option>
        </select>
        {formData.paymentType === 'card' && (
          <>
            <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleChange} value={formData.cardNumber} />
            <input type="text" name="cvc" placeholder="CVC" onChange={handleChange} value={formData.cvc} />
            <input type="text" name="expiryDate" placeholder="Expiry Date" onChange={handleChange} value={formData.expiryDate} />
          </>
        )}
        {formData.paymentType === 'e-wallet' && (
          <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} value={formData.phoneNumber} />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentMethodForm;