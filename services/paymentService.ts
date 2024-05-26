import { PaymentMethodRequest } from "@/interfaces";

// services/paymentService.ts
export const createPaymentMethod = async (data: PaymentMethodRequest) => {
  const response = await fetch('https://topupserviceadproc2.net/payment-methods/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAllPaymentMethods = async () => {
  const response = await fetch('https://topupserviceadproc2.net/payment-methods/');
  return response.json();
};

export const deletePaymentMethod = async (id: string) => {
  await fetch(`https://topupserviceadproc2.net/payment-methods/delete/${id}`, {
    method: 'DELETE',
  });
};

export const getAllPaymentMethodsByUserId = async (userId: number) => {
  const response = await fetch(`https://topupserviceadproc2.net/payment-methods/user/${userId}`);
  return response.json();
}