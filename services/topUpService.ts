import { TopUpRequest } from "@/interfaces";

// services/topUpService.ts
export const createTopUp = async (data: TopUpRequest) => {
  const response = await fetch('http://34.143.169.241/topups/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAllTopUps = async () => {
  const response = await fetch('http://34.143.169.241/topups/');
  return response.json();
};

export const cancelTopUp = async (topUpId: string) => {
  await fetch(`http://34.143.169.241/topups/${topUpId}/cancel`, {
    method: 'POST',
  });
};