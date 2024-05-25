// components/PaymentMethodList.tsx
import React from 'react';
import { PaymentMethod } from '@/interfaces';
import { deletePaymentMethod } from '@/services/paymentService';
import '@/styles/topupPayment.css';

interface PaymentMethodListProps {
  paymentMethods: PaymentMethod[];
  refreshData: () => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({ paymentMethods, refreshData }) => {
  const handleDelete = async (id: string) => {
    try {
      await deletePaymentMethod(id);
      refreshData();
    } catch (error) {
      console.error('Failed to delete payment method:', error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
      <ul className="list-disc pl-5">
        {paymentMethods.map((method) => (
          <li key={method.paymentId} className="mb-2">
            Type: {method.paymentType}, 
            Details: {method.paymentType === 'card' ? `${method.paymentDetails.cardNumber}, Expires: ${method.paymentDetails.expiryDate}` : `Phone: ${method.paymentDetails.phoneNumber}`}
            <button className="ml-4 py-1 px-2 bg-red-500 hover:bg-red-700 text-white rounded" onClick={() => handleDelete(method.paymentId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentMethodList;
