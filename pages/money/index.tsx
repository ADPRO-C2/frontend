// pages/money/index.tsx
import React, { useState, useEffect } from 'react';
import PaymentMethodList from '@/components/PaymentMethodList';
import PaymentMethodForm from '@/components/PaymentMethodForm';
import TopUpForm from '@/components/TopUpForm';
import TopUpList from '@/components/TopUpList';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from '@nextui-org/react';
import { getAllPaymentMethods } from '@/services/paymentService';
import { getAllTopUps } from '@/services/topUpService';

const MoneyPage: React.FC = () => {
  const paymentModal = useDisclosure();
  const topUpModal = useDisclosure();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [topUps, setTopUps] = useState([]);

  useEffect(() => {
    fetchPaymentMethods();
    fetchTopUps();
  }, []);

  const fetchPaymentMethods = async () => {
    const data = await getAllPaymentMethods();
    setPaymentMethods(data);
  };

  const fetchTopUps = async () => {
    const data = await getAllTopUps();
    setTopUps(data);
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-xl font-bold mb-4">Money Management</h1>
      <div className="flex justify-between mb-6">
        <Button onPress={topUpModal.onOpen}>Add Top-Up</Button>
        <Button onPress={paymentModal.onOpen}>Add Payment Method</Button>
      </div>
      <div className="flex flex-wrap gap-8">
        <div className="flex-1 min-w-[40%]">
          <TopUpList topUps={topUps} refreshData={fetchTopUps} />
        </div>
        <div className="flex-1 min-w-[40%]">
          <PaymentMethodList paymentMethods={paymentMethods} refreshData={fetchPaymentMethods} />
        </div>
      </div>
      <Modal isOpen={paymentModal.isOpen} onOpenChange={paymentModal.onOpenChange} className="bg-white rounded-lg p-4 shadow-lg max-w-md mx-auto">
  <ModalContent>
    <>
      <ModalHeader>Add Payment Method</ModalHeader>
      <ModalBody>
        <PaymentMethodForm />
      </ModalBody>
      <Button color="primary" onPress={paymentModal.onClose}>Close</Button>
    </>
  </ModalContent>
</Modal>
<Modal isOpen={topUpModal.isOpen} onOpenChange={topUpModal.onOpenChange} className="bg-white rounded-lg p-4 shadow-lg max-w-md mx-auto">
  <ModalContent>
    <>
      <ModalHeader>Add Top-Up</ModalHeader>
      <ModalBody>
        <TopUpForm />
      </ModalBody>
      <Button color="primary" onPress={topUpModal.onClose}>Close</Button>
    </>
  </ModalContent>
</Modal>

    </div>
  );
};

export default MoneyPage;
