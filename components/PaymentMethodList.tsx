// components/PaymentMethodList.tsx
import React, { useState } from 'react';
import { PaymentMethod } from '@/interfaces';
import { deletePaymentMethod } from '@/services/paymentService';
import ConfirmationModal from './ConfirmationModal';
import '@/styles/topupPayment.css';

interface PaymentMethodListProps {
  paymentMethods: PaymentMethod[];
  refreshData: () => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({ paymentMethods, refreshData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      await deletePaymentMethod(selectedId);
      refreshData();
    }
    setModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
      <div className="card-container">
        {paymentMethods.map((method) => (
          <div key={method.paymentId} className="card">
            <div className="card-title">{method.paymentType === 'card' ? 'CARD' : 'E-WALLET'}</div>
            <div className="card-details">
              {method.paymentType === 'card' ? `Card Number: ${method.paymentDetails.cardNumber} Expires: ${method.paymentDetails.expiryDate}` : method.paymentDetails.phoneNumber}
            </div>
            <button className="delete-button" onClick={() => handleDeleteClick(method.paymentId)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 19.5v-10.5m0 10.5v.5c0 .828.224 1.5.5 1.5h11c.276 0 .5-.672.5-1.5v-.5m-12-10.5h12v-3.5c0-.828-.224-1.5-.5-1.5h-11c-.276 0-.5.672-.5 1.5v3.5zm12 0v10.5m0-10.5l1.22-3.5m-14.44 0l1.22 3.5m-1.22-3.5h14.44m-12 3.5h10m-10 0v10.5m10-10.5v10.5" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this payment method?"
      />
    </div>
  );
};

export default PaymentMethodList;
