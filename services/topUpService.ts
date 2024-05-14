// services/topUpService.ts
export interface TopUpRequest {
    userId: string;
    amount: number;
    paymentMethodId: string;
  }
  
  export const createTopUp = async (data: TopUpRequest) => {
    const response = await fetch('http://localhost:8080/topups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };
  
  export const getAllTopUps = async () => {
    const response = await fetch('http://localhost:8080/topups');
    return response.json();
  };
  
  export const cancelTopUp = async (topUpId: string) => {
    await fetch(`http://localhost:8080/topups/${topUpId}/cancel`, {
      method: 'POST',
    });
  };
  