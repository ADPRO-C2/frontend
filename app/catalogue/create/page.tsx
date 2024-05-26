"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import NewListingForm, { NewListingData } from '@/components/sell/NewListingForm';
import { useVerifyMutation } from '@/redux/features/authApiSlice';

const PROFILE_URL = 'http://34.87.10.122/profile';

const CreateListingPage: React.FC = () => {
  const [userId, setUserId] = useState<number>();
  const [verify, isLoading] = useVerifyMutation();

  useEffect(() => {
    verify(undefined)
      .unwrap()
      .then((response) => {
        setUserId(response.id);
      });
  }, []);

  const handleFormSubmit = async (newListing: NewListingData) => {
    try {
      const response = await fetch(`http://34.142.129.98/api/seller-listings/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newListing, userId: userId }),
      });

      if (response.ok) {
        window.location.href = '/catalogue';
      } else {
        console.error('Failed to add new listing');
      }
    } catch (error) {
      console.error('Error adding new listing:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-center my-8">
        { userId && <NewListingForm onSubmit={handleFormSubmit} userId={userId} />}
      </div>
    </div>
  );
};

export default CreateListingPage;
