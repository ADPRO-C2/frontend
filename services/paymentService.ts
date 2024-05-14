// services/paymentService.ts
export interface PaymentMethodRequest {
  paymentType: string;
  cardNumber?: string;
  cvc?: string;
  expiryDate?: string;
  phoneNumber?: string;
}

export const createPaymentMethod = async (data: PaymentMethodRequest) => {
  const response = await fetch('http://localhost:8080/payment-methods/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAllPaymentMethods = async () => {
  const response = await fetch('http://localhost:8080/payment-methods/');
  return response.json();
};

export const deletePaymentMethod = async (id: string) => {
  await fetch(`http://localhost:8080/payment-methods/delete/${id}`, {
    method: 'DELETE',
  });
};
