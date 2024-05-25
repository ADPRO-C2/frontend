import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import NewListingForm, { NewListingData } from '@/components/sell/NewListingForm';
import { useRouter } from 'next/router';

const PROFILE_URL = 'http://34.87.10.122/profile';

const CreateListingPage: React.FC = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const profileResponse = await fetch(PROFILE_URL);
        const { userId } = await profileResponse.json();
        setUserId(userId);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleFormSubmit = async (newListing: NewListingData) => {
    try {
      const response = await fetch('http://34.142.129.98/api/seller-listings/2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newListing, userId: userId }),
      });

      if (response.ok) {
        router.push('/sell/CataloguePage');
      } else {
        console.error('Failed to add new listing');
      }
    } catch (error) {
      console.error('Error adding new listing:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center my-8">
        {/* {userId !== undefined && (
          <NewListingForm onSubmit={handleFormSubmit} userId={userId} />
        )} */}
        <NewListingForm onSubmit={handleFormSubmit} userId={2} />
      </div>
    </div>
  );
};

export default CreateListingPage;
