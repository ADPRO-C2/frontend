import { TopUpRequest } from "@/interfaces";

// services/topUpService.ts
export const createTopUp = async (data: TopUpRequest) => {
  const response = await fetch('https://topupserviceadproc2.net/topups/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAllTopUps = async () => {
  const response = await fetch('https://topupserviceadproc2.net/topups/');
  return response.json();
};

export const cancelTopUp = async (topUpId: string) => {
  await fetch(`https://topupserviceadproc2.net/topups/${topUpId}/cancel`, {
    method: 'PATCH',
  });
};

export const getAllTopUpsByUserId = async (userId: number) => { 
  const response = await fetch(`https://topupserviceadproc2.net/topups/user/${userId}`);
  return response.json();
};

