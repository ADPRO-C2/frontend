// components/PaymentMethodList.tsx
import { useEffect, useState } from 'react';
import { getAllPaymentMethods, deletePaymentMethod } from '@/services/paymentService';

import { PaymentMethod } from '@/interfaces';

const PaymentMethodList = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const fetchPaymentMethods = async () => {
    const response = await getAllPaymentMethods();
    setPaymentMethods(response.data);
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleDelete = async (id: string) => {
    await deletePaymentMethod(id);
    fetchPaymentMethods();
  };

  return (
    <div>
      <h2>Payment Methods</h2>
      <ul>
        {paymentMethods.map((method) => (
          <li key={method.paymentId}>
            {method.paymentType} - {method.paymentDetails?.cardNumber || method.paymentDetails?.phoneNumber}
            <button onClick={() => handleDelete(method.paymentId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentMethodList;
