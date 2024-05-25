import { PaymentMethodRequest } from "@/interfaces";

// services/paymentService.ts
export const createPaymentMethod = async (data: PaymentMethodRequest) => {
  const response = await fetch('http://34.143.169.241/payment-methods/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAllPaymentMethods = async () => {
  const response = await fetch('http://34.143.169.241/payment-methods/');
  return response.json();
};

export const deletePaymentMethod = async (id: string) => {
  await fetch(`http://34.143.169.241/payment-methods/delete/${id}`, {
    method: 'DELETE',
  });
};